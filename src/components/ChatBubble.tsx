import React from 'react';
import { Bot, User } from 'lucide-react';
import { marked } from 'marked';
import { Message } from '../types/chat';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  // Parse markdown safely
  const renderMarkdown = (text: string) => {
    try {
      const rawHtml = marked.parse(text, { breaks: true, gfm: true }) as string;
      return { __html: rawHtml };
    } catch {
      return { __html: text };
    }
  };

  return (
    <div className={`flex items-end gap-2.5 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-sm shrink-0 mb-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
          isUser
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-none shadow-md shadow-indigo-600/10'
            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none shadow-sm'
        }`}
      >
        <div
          className="prose dark:prose-invert prose-sm max-w-none space-y-1.5 leading-relaxed"
          dangerouslySetInnerHTML={renderMarkdown(message.text)}
        />
        <div
          className={`text-[10px] mt-1.5 text-right font-medium opacity-65 ${
            isUser ? 'text-indigo-100' : 'text-gray-400'
          }`}
        >
          {message.timestamp}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 flex items-center justify-center shrink-0 mb-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
