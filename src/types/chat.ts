import { ComponentType } from 'react';

export type TabType = 'dashboard' | 'mentor' | 'roadmap';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export interface SuggestionCardItem {
  id: string;
  title: string;
  description: string;
  iconName: 'resume' | 'roadmap' | 'interview';
  prompt: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  change?: string;
  iconName: 'score' | 'roadmap' | 'interview';
}

export interface RoadmapStepItem {
  id: string;
  level: string;
  title: string;
  salary: string;
  skills: string[];
  completed: boolean;
  progressPercent: number;
}
