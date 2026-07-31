import React from 'react';
import { Award, Target, MessageSquare } from 'lucide-react';
import { StatItem } from '../types/chat';

interface StatCardProps {
  stat: StatItem;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const getIcon = () => {
    switch (stat.iconName) {
      case 'score':
        return <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'roadmap':
        return <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'interview':
        return <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <div className="flex flex-col p-3.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
          {stat.label}
        </span>
        <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          {getIcon()}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-extrabold text-gray-900 dark:text-white">
          {stat.value}
        </span>
        {stat.change && (
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md">
            {stat.change}
          </span>
        )}
      </div>
    </div>
  );
};
