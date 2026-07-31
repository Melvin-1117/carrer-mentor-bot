import React from 'react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSession: (title: string) => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSession,
}) => {
  const sessions = [
    { id: '1', title: 'Resume Feedback #2', icon: 'chat', active: true },
    { id: '2', title: 'Java Roadmap Strategy', icon: 'map', active: false },
    { id: '3', title: 'Mock Interview Prep', icon: 'business_center', active: false },
  ];

  return (
    <div className={`fixed inset-0 z-50 flex ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer Container */}
      <aside
        className={`relative z-10 h-full w-80 bg-[var(--color-surface)] border-r border-[var(--color-outline-variant)]/50 flex flex-col p-4 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[var(--color-outline-variant)]/30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-primary)]">history</span>
            <span className="text-lg font-bold text-[var(--color-primary)] font-['Geist']">
              History
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--color-surface-container-high)] rounded-full">
            <span className="material-symbols-outlined text-[var(--color-on-surface-variant)]">close</span>
          </button>
        </div>

        {/* Sessions list */}
        <div className="space-y-2 flex-1 overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => {
                onSelectSession(session.title);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl font-semibold text-xs transition-all text-left ${
                session.active
                  ? 'bg-[var(--color-secondary-container)] text-white shadow-sm'
                  : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{session.icon}</span>
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>

        {/* Account footer */}
        <div className="mt-auto pt-4 border-t border-[var(--color-outline-variant)]/40">
          <div className="flex items-center gap-3 p-3 bg-[var(--color-surface-container-low)] rounded-xl shadow-xs border border-[var(--color-outline-variant)]/20">
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary-container)] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--color-on-surface)] font-['Geist']">Alex Chen</p>
              <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider font-semibold">
                Premium Member
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
