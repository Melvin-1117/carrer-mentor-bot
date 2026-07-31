import React from 'react';
import { X, User, History, Settings, HelpCircle, LogOut, Award, Sparkles, ChevronRight } from 'lucide-react';

export default function SidebarDrawer({ isOpen, onClose, onSelectTopic }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-[var(--bg-surface)] h-full z-10 p-5 flex flex-col justify-between shadow-2xl border-r border-[var(--border-color)] animate-slide-right">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">Sarah Jenkins</h4>
                <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Pro Mentor Plan
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Sections */}
          <div className="py-4 space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-2 px-2">
              Career Tools
            </p>
            {[
              { label: 'ATS Resume Optimizer', icon: Award, topic: 'Resume Audit' },
              { label: 'Behavioral Mock Practice', icon: Sparkles, topic: 'Mock Interview' },
              { label: 'Recent Chat History', icon: History, topic: 'History' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectTopic(item.topic);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>

          <div className="py-2 border-t border-[var(--border-color)] space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-2 px-2">
              Account
            </p>
            {[
              { label: 'Profile Settings', icon: User },
              { label: 'Preferences & AI Voice', icon: Settings },
              { label: 'Help & Career Guides', icon: HelpCircle },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
