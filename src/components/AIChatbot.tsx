import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to FHS Fashion. I am your AI stylist. How can I help you discover our premium collections today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an issue. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-[350px] h-[500px] border border-black/10 shadow-2xl flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black text-white p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">FHS AI STYLIST</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-50 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[85%] space-y-1",
                  m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}>
                  <div className={cn(
                    "p-3 text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-black text-white" 
                      : "bg-white border border-black/5 text-black"
                  )}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-black/30">
                    {m.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex space-x-1 items-center p-3 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-top border-black/5 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about style or products..."
                className="flex-grow text-xs px-3 py-2 border border-black/10 focus:outline-none focus:border-black transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-black text-white p-2 hover:opacity-80 transition-opacity disabled:opacity-20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform group"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
