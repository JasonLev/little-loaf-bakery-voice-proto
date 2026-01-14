'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, Square } from 'lucide-react';
import { bakeryInfo, menuItems } from '@/data/bakeryData';
import GeminiLiveInterface from './GeminiLiveInterface';

export default function ChatbotUI() {
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');

  const startVoiceMode = () => {
    setMode('voice');
  };

  if (mode === 'voice') {
    return <GeminiLiveInterface onBack={() => setMode('chat')} />;
  }

  return <ChatInterface onVoiceClick={startVoiceMode} />;
}

function ChatInterface({ onVoiceClick }: { onVoiceClick: () => void }) {
  const [messages, setMessages] = useState<{role: 'agent' | 'user' | 'system', text: string}[]>([
    { role: 'agent', text: "Warm greetings! 🥖 I'm your Little Loaf Bakery assistant. How can I help you today? You can ask about our menu, hours, or placing an order." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    const newHistory = [...messages, { role: 'user', text: userMsg }];
    setMessages(newHistory as {role: 'agent' | 'user', text: string}[]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          history: messages.filter(m => m.role !== 'system') 
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'agent', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'agent', text: "I'm having trouble connecting to the bakery right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-amber-700 text-white rounded-br-none' 
                : 'bg-white text-stone-800 shadow-sm border border-stone-100 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
            <div className="bg-white text-stone-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-stone-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white border-t border-stone-100">
        <form onSubmit={handleSend} className="flex gap-2 mb-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-stone-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <button 
            type="submit"
            className="bg-amber-700 text-white p-2 rounded-full hover:bg-amber-800 transition-colors shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <button 
          onClick={onVoiceClick}
          className="w-full py-2 border border-amber-200 text-amber-700 rounded-full flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors font-medium text-sm"
        >
          <Mic className="w-4 h-4" />
          Switch to Voice Mode
        </button>
      </div>
    </div>
  );
}

