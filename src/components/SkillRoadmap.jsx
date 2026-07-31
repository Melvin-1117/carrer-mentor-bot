import React, { useState } from 'react';
import { CheckCircle2, Circle, Trophy, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

export default function SkillRoadmap() {
  const [selectedRole, setSelectedRole] = useState('senior-eng');
  const [completedItems, setCompletedItems] = useState([1, 2, 4]);

  const roadmaps = {
    'senior-eng': {
      title: 'Senior Software Engineer',
      salary: '$140k - $190k / yr',
      level: 'Mid Level ➔ Senior Level',
      stages: [
        {
          id: 1,
          phase: 'Phase 1: Foundation Mastery',
          items: [
            { id: 1, name: 'Advanced Data Structures & System Algorithms', status: 'completed' },
            { id: 2, name: 'Clean Architecture & Design Patterns (SOLID)', status: 'completed' },
          ],
        },
        {
          id: 2,
          phase: 'Phase 2: Scalable Architecture',
          items: [
            { id: 3, name: 'Distributed Systems & Microservices Design', status: 'in-progress' },
            { id: 4, name: 'Database Indexing, Caching (Redis), & Partitioning', status: 'completed' },
          ],
        },
        {
          id: 3,
          phase: 'Phase 3: Leadership & Impact',
          items: [
            { id: 5, name: 'Technical RFC Writing & Cross-functional Mentorship', status: 'pending' },
            { id: 6, name: 'System Performance Auditing & Incident Command', status: 'pending' },
          ],
        },
      ],
    },
    'product-mgr': {
      title: 'Product Manager',
      salary: '$130k - $175k / yr',
      level: 'Associate ➔ Senior PM',
      stages: [
        {
          id: 1,
          phase: 'Phase 1: Product Strategy',
          items: [
            { id: 101, name: 'Market Research & User Persona Mapping', status: 'completed' },
            { id: 102, name: 'Product Spec Writing & User Stories', status: 'completed' },
          ],
        },
        {
          id: 2,
          phase: 'Phase 2: Analytics & Growth',
          items: [
            { id: 103, name: 'A/B Testing Frameworks & SQL Metrics', status: 'in-progress' },
            { id: 104, name: 'OKR Definition & Strategic Roadmap Alignment', status: 'pending' },
          ],
        },
      ],
    },
  };

  const currentRoadmap = roadmaps[selectedRole];

  const toggleItem = (itemId) => {
    setCompletedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <div className="flex-1 flex flex-col p-5 pb-28 max-w-md mx-auto w-full">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Skill Roadmap</h2>
          <p className="text-xs text-[var(--text-secondary)]">Step-by-step career path acceleration</p>
        </div>
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          <Trophy className="w-5 h-5" />
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl mb-5">
        <button
          onClick={() => setSelectedRole('senior-eng')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            selectedRole === 'senior-eng'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Senior Engineer
        </button>
        <button
          onClick={() => setSelectedRole('product-mgr')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            selectedRole === 'product-mgr'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Product Manager
        </button>
      </div>

      {/* Roadmap Overview Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {currentRoadmap.level}
          </span>
          <span className="text-xs font-bold bg-amber-400/90 text-amber-950 px-2.5 py-1 rounded-full">
            {currentRoadmap.salary}
          </span>
        </div>
        <h3 className="text-xl font-bold mt-1">{currentRoadmap.title}</h3>
        <p className="text-xs text-blue-100 mt-1">
          Master the key technical & leadership competencies required for promotion.
        </p>
      </div>

      {/* Timeline / Stages */}
      <div className="space-y-6 relative pl-4 border-l-2 border-blue-200 dark:border-blue-900/50 ml-2">
        {currentRoadmap.stages.map((stage) => (
          <div key={stage.id} className="relative pl-4">
            {/* Stage indicator dot */}
            <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-[var(--bg-primary)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2.5 flex items-center gap-2">
              <span>{stage.phase}</span>
            </h4>

            <div className="space-y-2">
              {stage.items.map((item) => {
                const isChecked = completedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-[var(--text-primary)]'
                        : 'bg-[var(--bg-card)] border-[var(--border-card)] hover:border-blue-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        isChecked ? 'line-through opacity-70' : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
