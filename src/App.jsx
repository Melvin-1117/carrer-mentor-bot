import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MentorChat from './components/MentorChat';
import SkillRoadmap from './components/SkillRoadmap';
import BottomNav from './components/BottomNav';
import SidebarDrawer from './components/SidebarDrawer';
import NotificationModal from './components/NotificationModal';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  // Sync theme with document data-theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectCard = (card) => {
    setActiveCard(card);
    if (card.tab === 'mentor') {
      setActiveTab('mentor');
      // If messages are empty or card prompt is selected, add as first message
      const initialUserMsg = {
        id: Date.now(),
        sender: 'user',
        text: card.prompt,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      let initialAiMsgText = 'Welcome to CareerAI Mentor! How can I assist with your request?';
      if (card.id === 'resume-audit') {
        initialAiMsgText = `🎯 **Resume Audit Initiated**\n\nUpload your current CV using the paperclip button below or paste your work experience details. I will analyze it against top tech industry ATS standards.`;
      } else if (card.id === 'mock-interview') {
        initialAiMsgText = `🎙️ **Mock Behavioral Interview**\n\nQuestion 1 of 3:\n*"Describe a situation where you led a challenging project with competing stakeholder priorities. How did you align the team and deliver?"*`;
      }

      const initialAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: initialAiMsgText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([initialUserMsg, initialAiMsg]);
    } else if (card.tab === 'roadmap') {
      setActiveTab('roadmap');
    }
  };

  const handleSelectTopicFromSidebar = (topic) => {
    if (topic === 'Resume Audit') {
      handleSelectCard({
        id: 'resume-audit',
        title: 'Resume Audit',
        prompt: 'Please review my resume for ATS readiness.',
        tab: 'mentor',
      });
    } else if (topic === 'Mock Interview') {
      handleSelectCard({
        id: 'mock-interview',
        title: 'Mock Interview',
        prompt: 'Start behavioral mock interview.',
        tab: 'mentor',
      });
    } else {
      setActiveTab('mentor');
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[var(--bg-primary)] transition-colors">
      {/* Top Bar Navigation */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        toggleSidebar={() => setIsSidebarOpen(true)}
        toggleNotifications={() => setIsNotificationsOpen(true)}
        hasUnreadNotifications={hasUnreadNotifications}
      />

      {/* Main View switching based on active tab */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {activeTab === 'dashboard' && (
          <Dashboard onSelectCard={handleSelectCard} />
        )}

        {activeTab === 'mentor' && (
          <MentorChat
            messages={messages}
            setMessages={setMessages}
            activeCard={activeCard}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'roadmap' && <SkillRoadmap />}
      </main>

      {/* Persistent Bottom Pill Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Drawer & Modal Popups */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectTopic={handleSelectTopicFromSidebar}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClear={() => setHasUnreadNotifications(false)}
      />
    </div>
  );
}
