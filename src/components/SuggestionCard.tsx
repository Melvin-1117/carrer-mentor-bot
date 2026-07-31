import React from 'react';
import { SuggestionCardItem } from '../types/chat';

interface SuggestionCardProps {
  card: SuggestionCardItem;
  onSelectCard: (card: SuggestionCardItem) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ card, onSelectCard }) => {
  const getIconName = () => {
    switch (card.iconName) {
      case 'resume':
        return 'description';
      case 'roadmap':
        return 'route';
      case 'interview':
        return 'campaign';
      default:
        return 'description';
    }
  };

  return (
    <button
      onClick={() => onSelectCard(card)}
      className="p-4 bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/60 rounded-xl hover:border-[var(--color-primary)] hover:shadow-lg transition-all text-left group cursor-pointer"
    >
      <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl mb-2 block group-hover:scale-110 transition-transform">
        {getIconName()}
      </span>
      <span className="text-xs font-bold font-['Geist'] block mb-1 text-[var(--color-on-surface)]">
        {card.title}
      </span>
      <span className="text-xs text-[var(--color-on-surface-variant)] leading-snug">
        {card.description}
      </span>
    </button>
  );
};
