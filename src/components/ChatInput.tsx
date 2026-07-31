import React, { useState, useRef } from 'react';
import { Paperclip, Mic, Send, Plus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onNewSession: () => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onNewSession,
  isLoading,
}) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="sticky bottom-16 left-0 right-0 z-30 px-4 py-2 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent dark:from-gray-900 dark:via-gray-900/90">
      <div className="relative max-w-md mx-auto flex flex-col items-end">
        {/* Floating "+" button above send button to start new session */}
        <button
          type="button"
          onClick={onNewSession}
          className="mb-2 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 cursor-pointer"
          title="New Chat Session"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Input Pill Bar */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 rounded-full px-4 py-2 shadow-lg shadow-gray-200/50 dark:shadow-none focus-within:ring-2 focus-within:ring-indigo-500/40 transition-all"
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onSendMessage(`Uploaded file: ${file.name} for review.`);
              }
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Attach document"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your career question..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none px-1"
          />

          <button
            type="button"
            onClick={() => setInput('Can you help me practice a behavioral interview question?')}
            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Voice input simulation"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Circular send button (indigo arrow icon) */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
