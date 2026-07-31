import React from 'react';
import { LayoutGrid, MessageSquareText, GitFork } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'mentor', label: 'Mentor', icon: MessageSquareText },
    { id: 'roadmap', label: 'Roadmap', icon: GitFork },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center p-3 pointer-events-none">
      <div className="w-full max-w-md bg-[var(--bg-surface)]/90 backdrop-blur-lg border border-[var(--border-color)] rounded-full p-1.5 shadow-xl flex items-center justify-around pointer-events-auto transition-all">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
