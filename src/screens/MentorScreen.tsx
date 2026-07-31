import React, { useEffect, useRef } from 'react';
import { Bot, Sparkles, RefreshCw } from 'lucide-react';
import { ChatBubble } from '../components/ChatBubble';
import { Message } from '../types/chat';

interface MentorScreenProps {
  messages: Message[];
  isLoading: boolean;
  onClearHistory: () => void;
}

export const MentorScreen: React.FC<MentorScreenProps> = ({
  messages,
  isLoading,
  onClearHistory,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 dark:bg-gray-900 pb-28">
      {/* Mentor Chat Subheader */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700/80 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
            CareerAI Assistant Active
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-[11px] font-semibold text-gray-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
            title="Reset Session"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              AI Career Workspace
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
              Type your career question below or select a suggestion card to start receiving personalized guidance.
            </p>
          </div>
        ) : (
          messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
        )}

        {/* Animated Typing Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
};
