import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="p-4 glass-panel border-t border-[var(--color-outline-variant)]/30 sticky bottom-0 left-0 right-0 z-30">
      <div className="max-w-3xl mx-auto relative">
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/50 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 rounded-2xl transition-all flex items-end p-2 gap-2 shadow-xs"
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onSendMessage(`Uploaded CV: ${file.name} for ATS review.`);
              }
            }}
          />

          <div className="flex items-center gap-1 pb-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-[var(--color-surface-container-low)] rounded-xl text-[var(--color-on-surface-variant)] transition-colors"
              title="Attach document"
            >
              <span className="material-symbols-outlined text-xl">attach_file</span>
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type your career question..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-2 text-sm text-[var(--color-on-surface)] placeholder-[var(--color-on-surface-variant)]/60 focus:outline-none"
          />

          <div className="flex items-center gap-1.5 pb-1">
            <button
              type="button"
              onClick={() => setInput('How can I prepare for a Senior Tech Lead interview in India?')}
              className="p-2 hover:bg-[var(--color-surface-container-low)] rounded-xl text-[var(--color-on-surface-variant)] transition-colors"
              title="Voice prompt simulation"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[var(--color-primary)] text-white p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-40 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center mt-2 text-[var(--color-on-surface-variant)]/80">
          CareerAI provides actionable guidance tailored for Indian professionals.
        </p>
      </div>
    </div>
  );
};
