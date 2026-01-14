'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { AudioRecorder, AudioPlayer } from '@/lib/gemini-live';
import { bakeryInfo, menuItems } from '@/data/bakeryData';

interface GeminiLiveInterfaceProps {
  onBack: () => void;
}

export default function GeminiLiveInterface({ onBack }: GeminiLiveInterfaceProps) {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('connecting');
  const [isTalking, setIsTalking] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const playerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    connectToGemini();
    return () => cleanup();
  }, []);

  const cleanup = () => {
    recorderRef.current?.stop();
    playerRef.current?.stop();
    wsRef.current?.close();
  };

  const connectToGemini = async () => {
    // WARNING: In production, do not expose API keys client-side. Proxy via your backend.
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'YOUR_API_KEY_HERE'; 
    const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus('connected');
        initializeSession(ws);
        startAudio();
      };

      ws.onmessage = async (event) => {
        const blob = event.data;
        if (blob instanceof Blob) {
           const text = await blob.text();
           const message = JSON.parse(text);
           handleMessage(message);
        } else {
           const message = JSON.parse(blob);
           handleMessage(message);
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        setStatus('error');
      };

      ws.onclose = () => {
        setStatus('disconnected');
      };

    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const initializeSession = (ws: WebSocket) => {
    const msg = {
      setup: {
        model: "models/gemini-2.0-flash-exp", // or gemini-1.5-flash-latest
        generationConfig: {
          responseModalities: ["AUDIO"], // We only want audio back for speed
        },
        systemInstruction: {
          parts: [{
            text: `You are the friendly AI assistant for "Little Loaf Bakery". 
            Your goal is to help customers with our menu, hours, and ordering.
            Keep responses concise, warm, and helpful.
            Speak in a friendly, slightly upbeat tone.
            
            Bakery Info: ${JSON.stringify(bakeryInfo)}
            Menu: ${JSON.stringify(menuItems)}
            `
          }]
        }
      }
    };
    ws.send(JSON.stringify(msg));
  };

  const startAudio = async () => {
    playerRef.current = new AudioPlayer();
    
    recorderRef.current = new AudioRecorder((base64Data) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const msg = {
          realtimeInput: {
            mediaChunks: [{
              mimeType: "audio/pcm; rate=16000",
              data: base64Data
            }]
          }
        };
        wsRef.current.send(JSON.stringify(msg));
      }
    });

    await recorderRef.current.start();
  };

  const handleMessage = (message: any) => {
    if (message.serverContent?.modelTurn?.parts) {
      setIsTalking(true);
      const parts = message.serverContent.modelTurn.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('audio/pcm')) {
          playerRef.current?.play(part.inlineData.data);
        }
      }
      // Simple timeout to reset talking state roughly
      setTimeout(() => setIsTalking(false), 2000); 
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-amber-50 relative h-full">
      <div className="text-center mb-12">
        <h3 className="text-xl font-bold text-amber-900 mb-2">Gemini Live</h3>
        <p className="text-amber-700 text-sm">
          {status === 'connected' ? 'Listening & Ready' : status}
        </p>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center mb-12">
        <div className={`absolute inset-0 bg-amber-200 rounded-full opacity-30 animate-ping ${isTalking ? 'duration-1000' : 'hidden'}`}></div>
        <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-colors duration-500 ${
          status === 'connected' ? 'bg-amber-600' : 'bg-stone-400'
        }`}>
          {status === 'connecting' ? (
             <Loader2 className="w-12 h-12 text-white animate-spin" />
          ) : (
             <Mic className="w-12 h-12 text-white" />
          )}
        </div>
      </div>

      <div className="text-center mb-8 max-w-[200px]">
        <p className="font-medium text-stone-700 text-sm">
          Speak naturally. You can interrupt me at any time.
        </p>
      </div>

      <button 
        onClick={onBack}
        className="mt-auto bg-white border border-stone-200 text-stone-600 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-stone-50 transition-colors shadow-sm"
      >
        <Square className="w-4 h-4 fill-stone-400 border-none" />
        End Session
      </button>
    </div>
  );
}
