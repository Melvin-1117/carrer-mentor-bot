import React from 'react';
import { TabType } from '../types/chat';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: 'dashboard' },
    { id: 'mentor' as TabType, label: 'Mentor', icon: 'chat' },
    { id: 'roadmap' as TabType, label: 'Roadmap', icon: 'route' },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-3 pt-2 bg-[var(--color-surface)]/90 backdrop-blur-xl border-t border-[var(--color-outline-variant)]/40 shadow-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--color-primary-container)] text-white shadow-md active:scale-90'
                : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span className="text-[11px] font-bold font-['Geist'] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
