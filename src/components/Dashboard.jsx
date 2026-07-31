import React from 'react';
import { FileText, GitFork, Megaphone } from 'lucide-react';

export default function Dashboard({ onSelectCard }) {
  const cards = [
    {
      id: 'resume-audit',
      title: 'Resume Audit',
      description: 'Analyze my CV for ATS optimization.',
      icon: FileText,
      prompt: 'Can you perform a detailed ATS Resume Audit on my experience? I want feedback on formatting, keywords, and impact metrics.',
      tab: 'mentor',
    },
    {
      id: 'skill-roadmap',
      title: 'Skill Roadmap',
      description: 'Step-by-step path to senior roles.',
      icon: GitFork,
      prompt: 'Generate a personalized career roadmap to help me transition into a Senior Tech Lead role.',
      tab: 'roadmap',
    },
    {
      id: 'mock-interview',
      title: 'Mock Interview',
      description: 'Practice common behavioral questions.',
      icon: Megaphone,
      prompt: 'Let us start a Mock Interview session for a Senior Software Engineer position. Ask me behavioral questions one by one.',
      tab: 'mentor',
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-28 max-w-md mx-auto w-full">
      {/* Hero Welcome Container */}
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        {/* Waving Hand Icon Badge */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 flex items-center justify-center mb-6 shadow-sm ring-8 ring-blue-500/5">
          <span className="text-4xl animate-wave">👋</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-3">
          How can I help you with your career today?
        </h1>

        {/* Hero Subtitle */}
        <p className="text-[15px] font-normal text-[var(--text-secondary)] leading-relaxed max-w-xs">
          I'm your AI career mentor. From refining resumes to role-playing tough interviews, I'm here to accelerate your professional growth.
        </p>
      </div>

      {/* Action Cards List */}
      <div className="flex flex-col gap-3.5 w-full">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="group relative flex flex-col p-4 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] rounded-2xl text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="text-[15px] font-bold text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
