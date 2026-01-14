'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatbotUI from './ChatbotUI';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCTA, setShowCTA] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowCTA(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  const handleOpen = () => {
    setIsOpen(true);
    setShowCTA(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      <AnimatePresence>
        {showCTA && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white text-stone-800 p-4 rounded-2xl shadow-2xl border border-amber-100 max-w-[240px] relative"
          >
            <p className="text-sm font-medium leading-tight">
              Chat with us! 🥖
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-amber-100 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen ? (
        <button
          onClick={handleOpen}
          className="bg-amber-700 text-white p-4 rounded-full shadow-2xl hover:bg-amber-800 transition-transform hover:scale-110 active:scale-90 flex items-center justify-center"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      ) : (
        <div 
          className="bg-white w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-100 animate-in fade-in slide-in-from-bottom-10 duration-300"
        >
          <div className="p-4 bg-amber-700 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-stone-900">
                <span className="text-xl">🥖</span>
              </div>
              <div>
                <h3 className="font-bold">Bakery Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-xs text-amber-100">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-amber-600 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <ChatbotUI onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
