import React, { useState } from 'react';

interface FabMenuProps {
  onQuickAction: (actionText: string) => void;
}

export const FabMenu: React.FC<FabMenuProps> = ({ onQuickAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: 'Resume Fix', icon: 'auto_fix_high', prompt: 'Audit my resume bullet points for high-impact metrics.' },
    { label: 'Cold Email AI', icon: 'mail', prompt: 'Draft a high-converting cold email for an Indian tech recruiter.' },
    { label: 'Salary Data', icon: 'payments', prompt: 'What is the benchmark CTC range for SDE-2 roles in Bengaluru?' },
  ];

  return (
    <div className="fixed right-4 bottom-24 z-30 flex flex-col items-end gap-2">
      {/* Collapsible Action Items */}
      <div
        className={`flex flex-col gap-2 mb-1 origin-bottom transition-all duration-200 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={() => {
              onQuickAction(act.prompt);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-3.5 py-2 bg-[var(--color-surface)] shadow-lg border border-[var(--color-outline-variant)]/40 rounded-full text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary-container)] hover:text-white transition-all cursor-pointer text-xs font-bold"
          >
            <span>{act.label}</span>
            <span className="material-symbols-outlined text-sm">{act.icon}</span>
          </button>
        ))}
      </div>

      {/* Primary Toggle FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 bg-[var(--color-secondary)] text-white rounded-2xl shadow-xl flex items-center justify-center hover:rotate-12 transition-transform active:scale-95 cursor-pointer"
        title="Quick Career Actions"
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'add'}
        </span>
      </button>
    </div>
  );
};
