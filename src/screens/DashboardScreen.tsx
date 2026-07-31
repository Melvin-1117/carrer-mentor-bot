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
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl mx-auto w-full flex flex-col justify-between">
      {/* Hero Welcome Container matching reference design */}
      <div className="w-full flex flex-col items-center text-center space-y-4 my-auto">
        <div className="bg-[var(--color-primary-container)]/10 p-4 rounded-full mb-2">
          <span className="text-4xl">👋</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-['Geist'] text-[var(--color-on-surface)] tracking-tight">
          How can I help you with your career today?
        </h2>

        <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] max-w-xl leading-relaxed">
          I'm your AI career mentor. From refining resumes to role-playing tough interviews, I'm here to accelerate your professional growth.
        </p>

        {/* Suggested Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full pt-4">
          {cards.map((card) => (
            <SuggestionCard key={card.id} card={card} onSelectCard={onSelectCard} />
          ))}
        </div>
      </div>

      {/* Activity Stats below the fold */}
      <div className="mt-8 pt-6 border-t border-[var(--color-outline-variant)]/30">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)] font-['Geist'] mb-3">
          Your Career Activity & Analytics
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};
