import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ChatInput } from './components/ChatInput';
import { DashboardScreen } from './screens/DashboardScreen';
import { MentorScreen } from './screens/MentorScreen';
import { RoadmapScreen } from './screens/RoadmapScreen';
import { sendClaudeMessage } from './lib/claudeClient';
import {
  TabType,
  Message,
  SuggestionCardItem,
  StatItem,
  RoadmapStepItem,
} from './types/chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync dark mode with document root class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initial Suggestion Cards as requested by user prompt
  const suggestionCards: SuggestionCardItem[] = [
    {
      id: 'resume-audit',
      title: 'Resume Audit',
      description: 'Analyze my CV for ATS optimization.',
      iconName: 'resume',
      prompt: 'Analyze my CV for ATS optimization and suggest improvements.',
    },
    {
      id: 'skill-roadmap',
      title: 'Skill Roadmap',
      description: 'Step-by-step path to senior roles.',
      iconName: 'roadmap',
      prompt: 'Provide a step-by-step skill roadmap to transition from mid-level to senior engineer.',
    },
    {
      id: 'mock-interview',
      title: 'Mock Interview',
      description: 'Practice common behavioral questions.',
      iconName: 'interview',
      prompt: 'Start a mock interview session for a senior developer role with behavioral questions.',
    },
  ];

  // Stats for Dashboard Below the Fold
  const stats: StatItem[] = [
    { id: '1', label: 'Resume Score', value: '88/100', change: '+12%', iconName: 'score' },
    { id: '2', label: 'Roadmap Progress', value: '65%', change: '+5%', iconName: 'roadmap' },
    { id: '3', label: 'Mock Practice', value: '4 Sessions', iconName: 'interview' },
  ];

  // Roadmap Steps state
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStepItem[]>([
    {
      id: 'step-1',
      level: 'Level 1',
      title: 'Junior Developer',
      salary: '$65k - $85k',
      skills: ['Git & Version Control', 'Core Data Structures', 'Basic API Development'],
      completed: true,
      progressPercent: 100,
    },
    {
      id: 'step-2',
      level: 'Level 2',
      title: 'Mid-Level Engineer',
      salary: '$90k - $125k',
      skills: ['TypeScript & Modern Frameworks', 'REST & GraphQL Design', 'CI/CD & Unit Testing'],
      completed: true,
      progressPercent: 100,
    },
    {
      id: 'step-3',
      level: 'Level 3',
      title: 'Senior Developer',
      salary: '$130k - $175k',
      skills: ['System Architecture & Scalability', 'Database Tuning & Caching', 'RFC Writing & Technical Mentorship'],
      completed: false,
      progressPercent: 65,
    },
    {
      id: 'step-4',
      level: 'Level 4',
      title: 'Staff / Tech Lead',
      salary: '$180k - $240k',
      skills: ['Distributed Systems Governance', 'Cross-Team Product Alignment', 'Incident Command Leadership'],
      completed: false,
      progressPercent: 20,
    },
  ]);

  const toggleRoadmapComplete = (id: string) => {
    setRoadmapSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? {
              ...step,
              completed: !step.completed,
              progressPercent: !step.completed ? 100 : 30,
            }
          : step
      )
    );
  };

  // Send message handler using Anthropic API wrapper
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setActiveTab('mentor');
    setIsLoading(true);

    try {
      const responseText = await sendClaudeMessage(updatedMessages);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Something went wrong while connecting to your career mentor. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Tapping suggestion card immediately switches to Mentor tab and sends prompt
  const handleSelectSuggestionCard = (card: SuggestionCardItem) => {
    handleSendMessage(card.prompt);
  };

  const handleNewSession = () => {
    setMessages([]);
    setActiveTab('dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FB] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header (persistent) */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenMenu={() => setActiveTab('dashboard')}
      />

      {/* Screens area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {activeTab === 'dashboard' && (
          <DashboardScreen
            cards={suggestionCards}
            stats={stats}
            onSelectCard={handleSelectSuggestionCard}
          />
        )}

        {activeTab === 'mentor' && (
          <MentorScreen
            messages={messages}
            isLoading={isLoading}
            onClearHistory={handleNewSession}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapScreen
            steps={roadmapSteps}
            onToggleComplete={toggleRoadmapComplete}
          />
        )}
      </main>

      {/* Floating Chat Input Bar (persistent) */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onNewSession={handleNewSession}
        isLoading={isLoading}
      />

      {/* Bottom Tab Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
