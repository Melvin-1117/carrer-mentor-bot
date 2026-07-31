import React from 'react';
import { LayoutGrid, MessageSquareText, GitFork } from 'lucide-react';
import { TabType } from '../types/chat';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutGrid },
    { id: 'mentor' as TabType, label: 'Mentor', icon: MessageSquareText },
    { id: 'roadmap' as TabType, label: 'Roadmap', icon: GitFork },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-center p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800">
      <div className="w-full max-w-md flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-md shadow-indigo-500/20 scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
