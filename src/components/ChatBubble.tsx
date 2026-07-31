import React, { useState } from 'react';
import { marked } from 'marked';
import { Message } from '../types/chat';

interface ChatBubbleProps {
  message: Message;
  onRetry?: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onRetry }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdown = (text: string) => {
    try {
      const rawHtml = marked.parse(text, { breaks: true, gfm: true }) as string;
      return { __html: rawHtml };
    } catch {
      return { __html: text };
    }
  };

  return (
    <div className={`flex gap-3 group ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex-shrink-0 flex items-center justify-center text-white shadow-xs">
          <span className="material-symbols-outlined text-sm fill-1">smart_toy</span>
        </div>
      )}

      <div className="space-y-1 max-w-[85%]">
        <div
          className={`p-3.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-[var(--color-primary)] text-white rounded-2xl rounded-tr-none shadow-md'
              : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface)] rounded-2xl rounded-tl-none shadow-xs border border-[var(--color-outline-variant)]/20'
          }`}
        >
          <div
            className="prose dark:prose-invert prose-sm max-w-none space-y-1.5"
            dangerouslySetInnerHTML={renderMarkdown(message.text)}
          />
          <div
            className={`text-[10px] mt-1.5 text-right font-medium opacity-70 ${
              isUser ? 'text-blue-100' : 'text-[var(--color-on-surface-variant)]'
            }`}
          >
            {message.timestamp}
          </div>
        </div>

        {/* AI Toolbar actions on hover */}
        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-on-surface-variant)] pt-0.5">
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-[var(--color-surface-container-high)] rounded text-xs transition-colors"
              title="Copy message"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
            </button>
            <button
              onClick={() => setLiked(liked === true ? null : true)}
              className={`p-1 hover:bg-[var(--color-surface-container-high)] rounded text-xs transition-colors ${
                liked === true ? 'text-emerald-500' : ''
              }`}
              title="Helpful"
            >
              <span className="material-symbols-outlined text-sm">thumb_up</span>
            </button>
            <button
              onClick={() => setLiked(liked === false ? null : false)}
              className={`p-1 hover:bg-[var(--color-surface-container-high)] rounded text-xs transition-colors ${
                liked === false ? 'text-rose-500' : ''
              }`}
              title="Not helpful"
            >
              <span className="material-symbols-outlined text-sm">thumb_down</span>
            </button>
            {onRetry && (
              <button
                onClick={onRetry}
                className="p-1 hover:bg-[var(--color-surface-container-high)] rounded text-xs transition-colors"
                title="Regenerate"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
