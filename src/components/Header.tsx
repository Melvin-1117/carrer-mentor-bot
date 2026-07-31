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
    <header className="w-full top-0 sticky z-40 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-outline-variant)]/30 shadow-xs flex justify-between items-center px-4 py-3 max-w-6xl mx-auto transition-colors">
      {/* Left: Drawer Toggle + Logo + AI Online Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleDrawer}
          className="p-2 hover:bg-[var(--color-surface-container-high)] rounded-full transition-colors"
          aria-label="Toggle history menu"
        >
          <span className="material-symbols-outlined text-[var(--color-primary)]">menu</span>
        </button>

        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl fill-1">
            smart_toy
          </span>
          <h1 className="text-xl font-bold text-[var(--color-primary)] font-['Geist'] tracking-tight">
            CareerAI
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[var(--color-surface-container-low)] rounded-full border border-[var(--color-outline-variant)]/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-[var(--color-on-surface-variant)]">AI Online</span>
        </div>
      </div>

      {/* Right controls: Contrast toggle, Bell, User Avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-[var(--color-on-surface-variant)] hover:opacity-80 transition-opacity rounded-full"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined">contrast</span>
        </button>

        <button
          className="p-2 text-[var(--color-on-surface-variant)] hover:opacity-80 transition-opacity rounded-full relative"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="w-9 h-9 rounded-full border-2 border-[var(--color-primary)] overflow-hidden cursor-pointer active:scale-95 transition-transform duration-200 shadow-sm">
          <img
            className="w-full h-full object-cover"
            alt="Alex Chen Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwbyTZx2TieZrC0h5Nvh0BjCmGjccH8PhbjNa6Znpeh6541yn8M-o7xANRIyMPwgjJHMiuIEnx700c6BBvMsmu7clRRpqMHTn3w5z2Y7ApZ-A1UewTf4nXiTmx3EYWG64iwz5L-T4JQ_ngwnn8c_x7Il6nGU6g1_LffOSfWVjsGSAgpfO3uD0C8FPNMmPWJaeP-coA07-c-hKBtd3WE-g7igtIZuApYA0sKwpH8R8iaZcAhZPZGyxIfA"
          />
        </div>
      </div>
    </header>
  );
};
