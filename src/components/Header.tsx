import React from 'react';
import { Menu, Bot, Moon, Sun, Bell, CircleDot } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onOpenMenu }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3.5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors">
      {/* Left: Hamburger menu */}
      <button
        onClick={onOpenMenu}
        className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center-left: Logo icon + Wordmark */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
          <Bot className="w-5 h-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
          CareerAI
        </span>
      </div>

      {/* Right side: Dark mode half-circle toggle, bell, avatar */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle Dark Mode"
        >
          {/* Half-filled circle icon indicator as requested */}
          <CircleDot className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-indigo-600'}`} />
        </button>

        <button
          className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
        </button>

        <div className="relative ml-1 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40 hover:ring-indigo-600 transition-all shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
        </div>
      </div>
    </header>
  );
};
