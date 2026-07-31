import React from 'react';
import { SuggestionCard } from './SuggestionCard';
import { SuggestionCardItem } from '../types/chat';

interface WelcomeStateProps {
  cards: SuggestionCardItem[];
  onSelectCard: (card: SuggestionCardItem) => void;
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({ cards, onSelectCard }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-sm mx-auto w-full">
      {/* Waving Hand Badge */}
      <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center mb-6 shadow-sm ring-8 ring-indigo-500/5">
        <span className="text-4xl animate-wave">👋</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
        How can I help you with your career today?
      </h1>

      {/* Subheading */}
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
        I'm your AI career mentor. From refining resumes to role-playing tough interviews, I'm here to accelerate your professional growth.
      </p>

      {/* Stacked Suggestion Cards */}
      <div className="w-full space-y-3 mb-6">
        {cards.map((card) => (
          <SuggestionCard key={card.id} card={card} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
};
