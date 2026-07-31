import React, { useEffect, useRef } from 'react';
import { ChatBubble } from '../components/ChatBubble';
import { Message } from '../types/chat';

interface MentorScreenProps {
  messages: Message[];
  isLoading: boolean;
  onClearHistory: () => void;
  onSendMessage: (text: string) => void;
}

export const MentorScreen: React.FC<MentorScreenProps> = ({
  messages,
  isLoading,
  onClearHistory,
  onSendMessage,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--color-background)] overflow-hidden">
      {/* Mentor Chat Subheader */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-[var(--color-surface-container-low)] border-b border-[var(--color-outline-variant)]/20 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold font-['Geist'] text-[var(--color-on-surface-variant)]">
            Career Mentor Workspace Active (Indian Tech Ecosystem)
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs font-semibold text-[var(--color-on-surface-variant)] hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset Session"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Chat Messages Canvas */}
      <div className="flex-1 overflow-y-auto chat-scroll px-4 sm:px-8 py-6 space-y-4 max-w-5xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="material-symbols-outlined text-2xl fill-1">smart_toy</span>
            </div>
            <h3 className="text-xl font-bold font-['Geist'] text-[var(--color-on-surface)]">
              Career Mentor Chat Workspace
            </h3>
            <p className="text-sm text-[var(--color-on-surface-variant)] mt-1.5 max-w-md mx-auto leading-relaxed">
              Ask any question regarding ATS resume reviews, behavioral mock interview scenarios, or skill roadmaps.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              onRetry={
                msg.sender === 'ai'
                  ? () => onSendMessage('Can you expand on the previous answer with more details?')
                  : undefined
              }
            />
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex-shrink-0 flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-sm fill-1">smart_toy</span>
            </div>
            <div className="bg-[var(--color-surface-container)] px-4 py-3 rounded-2xl rounded-tl-none shadow-xs flex gap-1.5 items-center">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
};
