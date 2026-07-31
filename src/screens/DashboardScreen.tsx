import React from 'react';
import { SuggestionCard } from '../components/SuggestionCard';
import { StatCard } from '../components/StatCard';
import { SuggestionCardItem, StatItem } from '../types/chat';

interface DashboardScreenProps {
  cards: SuggestionCardItem[];
  stats: StatItem[];
  onSelectCard: (card: SuggestionCardItem) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  cards,
  stats,
  onSelectCard,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-5xl mx-auto w-full flex flex-col justify-between">
      {/* Hero Welcome Container */}
      <div className="w-full flex flex-col items-center text-center space-y-4 my-auto">
        <div className="bg-[var(--color-primary-container)]/10 p-5 rounded-full mb-2 shadow-xs">
          <span className="text-5xl">👋</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-['Geist'] text-[var(--color-on-surface)] tracking-tight">
          How can I help you with your career today?
        </h2>

        <p className="text-sm sm:text-base text-[var(--color-on-surface-variant)] max-w-2xl leading-relaxed">
          I'm your AI career mentor. From refining resumes to role-playing tough interviews, I'm here to accelerate your professional growth.
        </p>

        {/* Suggested Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-6">
          {cards.map((card) => (
            <SuggestionCard key={card.id} card={card} onSelectCard={onSelectCard} />
          ))}
        </div>
      </div>

      {/* Activity Stats below the fold */}
      <div className="mt-10 pt-6 border-t border-[var(--color-outline-variant)]/30 w-full">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)] font-['Geist'] mb-4">
          Your Career Activity & Analytics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};
