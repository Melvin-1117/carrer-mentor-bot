import React from 'react';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { RoadmapStepItem } from '../types/chat';

interface RoadmapStepProps {
  step: RoadmapStepItem;
  onToggleComplete: (id: string) => void;
}

export const RoadmapStep: React.FC<RoadmapStepProps> = ({ step, onToggleComplete }) => {
  return (
    <div className="relative pl-6 pb-6 border-l-2 border-indigo-100 dark:border-indigo-900/50 last:pb-0">
      {/* Node Bullet */}
      <button
        onClick={() => onToggleComplete(step.id)}
        className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
      >
        {step.completed ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50 dark:fill-emerald-950" />
        ) : (
          <Circle className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
        )}
      </button>

      {/* Card Body */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
            {step.level}
          </span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            {step.salary}
          </span>
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
          {step.title}
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3 overflow-hidden">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${step.progressPercent}%` }}
          />
        </div>

        {/* Skills list */}
        <div className="space-y-1.5">
          {step.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
