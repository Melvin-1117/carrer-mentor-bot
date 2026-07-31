import React from 'react';
import { X, Check, Bell, Award, Sparkles, AlertCircle } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose, onClear }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'ATS Resume Score Ready',
      desc: 'Your uploaded CV scored 88/100 for Senior Software Engineer roles.',
      time: '10m ago',
      icon: Award,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      id: 2,
      title: 'New Skill Roadmap Available',
      desc: 'Updated 2026 competencies for Lead System Architect paths.',
      time: '1h ago',
      icon: Sparkles,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      id: 3,
      title: 'Mock Interview Reminder',
      desc: 'Complete 1 behavioral STAR scenario to maintain your 5-day streak.',
      time: '1d ago',
      icon: AlertCircle,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 shadow-2xl z-10 animate-scale-up">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-sm font-bold text-[var(--text-primary)]">Notifications</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-3 space-y-3 max-h-80 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)]"
              >
                <div className={`p-2 rounded-xl shrink-0 ${n.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h5 className="text-xs font-bold text-[var(--text-primary)]">{n.title}</h5>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                    {n.desc}
                  </p>
                  <span className="text-[9px] font-semibold text-[var(--text-muted)] mt-1 block">
                    {n.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[var(--border-color)] flex justify-end">
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 p-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>
    </div>
  );
}
