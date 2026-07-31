import React from 'react';
import { Menu, Bot, Moon, Sun, Bell } from 'lucide-react';

export default function Header({ theme, toggleTheme, toggleSidebar, toggleNotifications, hasUnreadNotifications }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] transition-colors">
      {/* Left side: Hamburger menu */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-all active:scale-95"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Center: Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
          <Bot className="w-5 h-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          CareerAI
        </span>
      </div>

      {/* Right side controls: Theme switch, Bell, Avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-all active:scale-95"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        <button
          onClick={toggleNotifications}
          className="relative p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-all active:scale-95"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {hasUnreadNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[var(--bg-primary)] animate-pulse" />
          )}
        </button>

        <div className="relative group cursor-pointer ml-1">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
            alt="User profile"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30 hover:ring-blue-500 transition-all shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[var(--bg-primary)] rounded-full"></span>
        </div>
      </div>
    </header>
  );
}
