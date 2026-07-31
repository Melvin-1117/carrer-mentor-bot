import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ChatInput } from './components/ChatInput';
import { SidebarDrawer } from './components/SidebarDrawer';
import { FabMenu } from './components/FabMenu';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const suggestionCards: SuggestionCardItem[] = [
    {
      id: 'resume-audit',
      title: 'Resume Audit',
      description: 'Analyze my CV for ATS optimization.',
      iconName: 'resume',
      prompt: 'Analyze my CV for ATS optimization and suggest improvements for Indian product and MNC recruiters.',
    },
    {
      id: 'skill-roadmap',
      title: 'Skill Roadmap',
      description: 'Step-by-step path to senior roles.',
      iconName: 'roadmap',
      prompt: 'Provide a step-by-step skill roadmap to transition to a Senior SDE role with ₹25+ LPA compensation.',
    },
    {
      id: 'mock-interview',
      title: 'Mock Interview',
      description: 'Practice common behavioral questions.',
      iconName: 'interview',
      prompt: 'Start a mock interview session for a Senior Software Engineer role in India.',
    },
  ];

  const stats: StatItem[] = [
    { id: '1', label: 'ATS CV Score', value: '88/100', change: '+12%', iconName: 'score' },
    { id: '2', label: 'Roadmap Target', value: '₹35 LPA', change: '+15%', iconName: 'roadmap' },
    { id: '3', label: 'Mock Practice', value: '4 Sessions', iconName: 'interview' },
  ];

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStepItem[]>([
    {
      id: 'step-1',
      level: 'Level 1',
      title: 'Junior SDE / Associate Engineer',
      salary: '₹6 LPA - ₹12 LPA',
      skills: ['Git & Clean Code Principles', 'DSA & Problem Solving', 'REST APIs & Node/React Core'],
      completed: true,
      progressPercent: 100,
    },
    {
      id: 'step-2',
      level: 'Level 2',
      title: 'SDE-2 / Mid-Level Software Engineer',
      salary: '₹14 LPA - ₹24 LPA',
      skills: ['TypeScript & Modern Frameworks', 'Microservices & Database Optimization', 'CI/CD Pipelines & Unit Testing'],
      completed: true,
      progressPercent: 100,
    },
    {
      id: 'step-3',
      level: 'Level 3',
      title: 'Senior SDE / Tech Lead',
      salary: '₹26 LPA - ₹45 LPA',
      skills: ['System Architecture & Scalability (HLD)', 'Low-Level Design (LLD) & Machine Coding', 'RFC Documents & Technical Mentorship'],
      completed: false,
      progressPercent: 65,
    },
    {
      id: 'step-4',
      level: 'Level 4',
      title: 'Staff Engineer / Engineering Manager',
      salary: '₹50 LPA - ₹85+ LPA',
      skills: ['Distributed Systems Governance', 'Product Business Alignment & OKRs', 'Incident Command & Tech Leadership'],
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

  const handleSelectSuggestionCard = (card: SuggestionCardItem) => {
    handleSendMessage(card.prompt);
  };

  const handleSelectSessionFromDrawer = (sessionTitle: string) => {
    handleSendMessage(`Review session context: ${sessionTitle}`);
  };

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-surface)] min-h-screen flex flex-col overflow-hidden">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Main Full-Width Platform Canvas */}
      <div className="flex flex-1 overflow-hidden relative max-w-7xl mx-auto w-full">
        {/* Slide-out Navigation History Drawer */}
        <SidebarDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSelectSession={handleSelectSessionFromDrawer}
        />

        {/* Main Platform Content */}
        <main className="flex-1 flex flex-col relative bg-[var(--color-background)] h-full overflow-hidden">
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
              onClearHistory={() => setMessages([])}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapScreen
              steps={roadmapSteps}
              onToggleComplete={toggleRoadmapComplete}
            />
          )}

          {/* Sticky Chat Input Bar */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

          {/* Floating Action Quick Menu */}
          <FabMenu onQuickAction={handleSendMessage} />
        </main>
      </div>

      {/* Bottom Tab Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
