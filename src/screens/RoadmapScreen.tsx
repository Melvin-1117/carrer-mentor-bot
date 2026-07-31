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
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-5xl mx-auto w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-xl mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-md font-['Geist']">
            Indian Tech Career Track
          </span>
          <span className="text-sm font-bold text-indigo-100">
            {completedCount} of {steps.length} Milestones Mastered
          </span>
        </div>
        <h2 className="text-2xl font-extrabold font-['Geist']">Software Engineering Roadmap (₹ LPA)</h2>
        <div className="mt-4">
          <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-medium text-indigo-100">
            <span>Progress to Senior SDE (₹35+ LPA)</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-amber-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="mt-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-on-surface-variant)] mb-4 px-1 font-['Geist']">
          Milestones & Skill Requirements
        </h3>
        <div className="space-y-4">
          {steps.map((step) => (
            <RoadmapStep key={step.id} step={step} onToggleComplete={onToggleComplete} />
          ))}
        </div>
      </div>
    </div>
  );
};
