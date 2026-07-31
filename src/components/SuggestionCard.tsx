import React from 'react';
import { FileText, GitFork, Megaphone } from 'lucide-react';
import { SuggestionCardItem } from '../types/chat';

interface SuggestionCardProps {
  card: SuggestionCardItem;
  onSelectCard: (card: SuggestionCardItem) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ card, onSelectCard }) => {
  const getIcon = () => {
    switch (card.iconName) {
      case 'resume':
        return <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'roadmap':
        return <GitFork className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'interview':
        return <Megaphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <button
      onClick={() => onSelectCard(card)}
      className="w-full flex items-start gap-3.5 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-2xl text-left shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
    >
      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 pt-0.5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
          {card.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
          {card.description}
        </p>
      </div>
    </button>
  );
};
