import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onToggleDrawer,
}) => {
  return (
    <header className="w-full top-0 sticky z-40 bg-[var(--color-background)]/85 backdrop-blur-md border-b border-[var(--color-outline-variant)]/30 shadow-xs flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto transition-colors">
      {/* Left: Drawer Toggle + Bot Logo + Name */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleDrawer}
          className="p-2 hover:bg-[var(--color-surface-container-high)] rounded-full transition-colors cursor-pointer"
          aria-label="Toggle history menu"
        >
          <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl">menu</span>
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer">
          <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl sm:text-4xl fill-1">
            smart_toy
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] font-['Geist'] tracking-tight">
            Career Mentor
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[var(--color-surface-container-low)] rounded-full border border-[var(--color-outline-variant)]/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-[var(--color-on-surface-variant)] font-['Geist']">
            AI Online
          </span>
        </div>
      </div>

      {/* Right controls: Theme toggle, Notification bell (Profile avatar completely removed as requested) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleDarkMode}
          className="p-2.5 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] rounded-full transition-all cursor-pointer"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined text-xl">contrast</span>
        </button>

        <button
          className="p-2.5 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] rounded-full transition-all cursor-pointer relative"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};
