'use client';

import React, { useState, useEffect } from 'react';
import GeminiLiveInterface from './GeminiLiveInterface';
import { History, Mic2, MessageSquare, ChevronRight, Clock } from 'lucide-react';

interface ChatbotUIProps {
  onClose: () => void;
}

export default function ChatbotUI({ onClose }: ChatbotUIProps) {
  const [view, setView] = useState<'voice' | 'history'>('voice');
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bakery_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Group messages into sessions based on time gaps or just show as one long history
        setHistory(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, [view]);

  return (
    <div className="flex-grow flex flex-col overflow-hidden bg-stone-50">
      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 bg-white">
        <button 
          onClick={() => setView('voice')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            view === 'voice' ? 'text-amber-700 border-b-2 border-amber-700 bg-amber-50/30' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <Mic2 className="w-4 h-4" />
          Live Voice
        </button>
        <button 
          onClick={() => setView('history')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            view === 'history' ? 'text-amber-700 border-b-2 border-amber-700 bg-amber-50/30' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <History className="w-4 h-4" />
          Chat History
        </button>
      </div>

      <div className="flex-grow overflow-hidden relative">
        {view === 'voice' ? (
          <GeminiLiveInterface onBack={onClose} />
        ) : (
          <HistoryView history={history} />
        )}
      </div>
    </div>
  );
}

function HistoryView({ history }: { history: any[] }) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-stone-400">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 opacity-20" />
        </div>
        <p className="text-sm">No previous conversations yet.</p>
        <p className="text-xs mt-2">Your voice transcripts will appear here after your sessions.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Clock className="w-4 h-4 text-amber-600" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">Past Conversations</h4>
      </div>
      
      {/* For simplicity, we show messages. In a more complex app, we'd group these by session */}
      <div className="space-y-3">
        {history.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm ${
              msg.role === 'user' 
                ? 'bg-amber-100 text-amber-900 rounded-br-none' 
                : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-stone-400 mt-1 px-1">
              {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
