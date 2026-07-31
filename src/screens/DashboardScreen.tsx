import React from 'react';
import { WelcomeState } from '../components/WelcomeState';
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
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28 max-w-md mx-auto w-full">
      {/* Welcome State */}
      <WelcomeState cards={cards} onSelectCard={onSelectCard} />

      {/* Quick Stats Below the Fold */}
      <div className="mt-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
          Your Career Activity & Analytics
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};
