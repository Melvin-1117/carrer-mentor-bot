import React from 'react';
import { RoadmapStep } from '../components/RoadmapStep';
import { RoadmapStepItem } from '../types/chat';

interface RoadmapScreenProps {
  steps: RoadmapStepItem[];
  onToggleComplete: (id: string) => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({ steps, onToggleComplete }) => {
  const completedCount = steps.filter((s) => s.completed).length;
  const overallProgress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28 max-w-md mx-auto w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-4 text-white shadow-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
            Indian Tech Career Track
          </span>
          <span className="text-xs font-bold text-indigo-100">
            {completedCount} of {steps.length} Milestones Mastered
          </span>
        </div>
        <h2 className="text-xl font-extrabold">Software Engineering Roadmap (₹ LPA)</h2>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1 font-medium text-indigo-100">
            <span>Progress to Senior SDE (₹35+ LPA)</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="mt-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-1">
          Milestones & Skill Requirements
        </h3>
        <div>
          {steps.map((step) => (
            <RoadmapStep key={step.id} step={step} onToggleComplete={onToggleComplete} />
          ))}
        </div>
      </div>
    </div>
  );
};
