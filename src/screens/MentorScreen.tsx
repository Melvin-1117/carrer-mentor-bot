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
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface-container-low)] border-b border-[var(--color-outline-variant)]/20 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold font-['Geist'] text-[var(--color-on-surface-variant)]">
            AI Mentor Active (Indian Tech Hubs)
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-[11px] font-semibold text-[var(--color-on-surface-variant)] hover:text-rose-500 flex items-center gap-1 transition-colors"
            title="Reset Session"
          >
            <span className="material-symbols-outlined text-xs">refresh</span>
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="material-symbols-outlined text-xl fill-1">smart_toy</span>
            </div>
            <h3 className="text-lg font-bold font-['Geist'] text-[var(--color-on-surface)]">
              AI Career Mentor Workspace
            </h3>
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-1 max-w-xs mx-auto">
              Type your career question below or use the quick action buttons to begin.
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

        {/* AI Typing Indicator matching reference HTML */}
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
