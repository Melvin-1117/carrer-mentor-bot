import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Paperclip, Mic, FileText, CheckCircle2, Sparkles, ArrowLeft, RefreshCw, Award } from 'lucide-react';

export default function MentorChat({ messages, setMessages, activeCard, onBackToDashboard }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend = input) => {
    const messageText = textToSend.trim();
    if (!messageText && !attachedFile) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText || (attachedFile ? `Uploaded ${attachedFile.name} for review.` : ''),
      attachment: attachedFile ? attachedFile.name : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachedFile(null);
    setIsTyping(true);

    // Simulate intelligent AI Mentor Response
    setTimeout(() => {
      let aiText = "That's a great career question! Let me provide actionable guidance tailored to your goals.";
      
      const lower = messageText.toLowerCase();
      if (lower.includes('resume') || lower.includes('cv') || lower.includes('ats')) {
        aiText = `🎯 **ATS Resume Analysis Complete**\n\nHere is your instant feedback breakdown:\n\n` +
          `• **ATS Compatibility Index**: 88/100 (Strong)\n` +
          `• **Action Verb Density**: High (e.g. *Spearheaded*, *Optimized*, *Architected*)\n` +
          `• **Key Recommendation**: Quantify 2 more bullet points with clear metrics (e.g., "% decrease in latency" or "$ saved").\n\n` +
          `Would you like me to rewrite your top summary paragraph for maximum executive impact?`;
      } else if (lower.includes('interview') || lower.includes('mock') || lower.includes('behavioral')) {
        aiText = `🎙️ **Mock Interview Mode Active**\n\nLet's start with a classic behavioral question using the STAR method (Situation, Task, Action, Result):\n\n` +
          `*"Tell me about a time when you had to make a critical technical decision under extreme time pressure with ambiguous requirements."*\n\n` +
          `Take your time to frame your response!`;
      } else if (lower.includes('roadmap') || lower.includes('senior') || lower.includes('promotion')) {
        aiText = `🗺️ **Executive Growth Recommendation**\n\nTo move into a Senior / Lead role, focus on 3 pillars:\n` +
          `1. **System Architecture**: Mastery of distributed systems and scalable design pattern.\n` +
          `2. **Cross-functional Mentorship**: Sponsoring junior engineers & driving RFC proposals.\n` +
          `3. **Business Impact**: Aligning technical metrics with quarterly product OKRs.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)] pb-24">
      {/* Header bar for Chat */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-10">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">AI Mentor Active</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 px-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Career Mentor Workspace</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs mx-auto">
              Ask any question about interview prep, resume optimization, salary negotiation, or skill roadmaps.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/10'
                  : 'bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] rounded-bl-none shadow-sm'
              }`}
            >
              {msg.attachment && (
                <div className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-white/10 dark:bg-black/20 text-xs font-medium border border-white/20">
                  <FileText className="w-4 h-4" />
                  <span className="truncate">{msg.attachment}</span>
                </div>
              )}
              <div className="whitespace-pre-line font-normal">{msg.text}</div>
              <div
                className={`text-[10px] mt-1.5 text-right font-medium opacity-70 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-[var(--text-muted)]'
                }`}
              >
                {msg.time}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2.5 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-1.5">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Attachment banner if any */}
      {attachedFile && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 border-t border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-300">
            <FileText className="w-4 h-4" />
            <span className="truncate max-w-[200px]">{attachedFile.name}</span>
          </div>
          <button
            onClick={() => setAttachedFile(null)}
            className="text-xs text-rose-500 font-bold hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {/* Chat Input Container */}
      <div className="p-3 bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full px-3.5 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/30 transition-all"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-blue-600 hover:bg-[var(--bg-card-hover)] transition-all"
            title="Attach Resume / CV"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your career question..."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none px-1"
          />

          <button
            type="button"
            onClick={() => {
              setInput('Practice a behavioral interview question with me.');
            }}
            className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-blue-600 hover:bg-[var(--bg-card-hover)] transition-all"
            title="Voice input simulation"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!input.trim() && !attachedFile}
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
