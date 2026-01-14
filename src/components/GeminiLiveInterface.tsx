'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Mic, Square, Loader2, AlertCircle } from 'lucide-react';
import { AudioRecorder, AudioPlayer } from '@/lib/gemini-live';
import { bakeryInfo, menuItems } from '@/data/bakeryData';

interface GeminiLiveInterfaceProps {
  onBack: () => void;
}

export default function GeminiLiveInterface({ onBack }: GeminiLiveInterfaceProps) {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('connecting');
  const [isTalking, setIsTalking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const playerRef = useRef<AudioPlayer | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    let ws: WebSocket | null = null;

    const connectToGemini = async () => {
      // WARNING: In production, do not expose API keys client-side. Proxy via your backend.
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey || apiKey.includes('your_gemini_api_key')) {
        setErrorMessage('Invalid API Key');
        setStatus('error');
        return;
      }

      const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;

      try {
        ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!mountedRef.current) {
            ws?.close();
            return;
          }
          setStatus('connected');
          initializeSession(ws);
          startAudio(ws);
        };

        ws.onmessage = async (event) => {
          if (!mountedRef.current) return;
          
          try {
            let message;
            if (event.data instanceof Blob) {
              const text = await event.data.text();
              message = JSON.parse(text);
            } else {
              message = JSON.parse(event.data);
            }
            handleMessage(message);
          } catch (e) {
            console.error('Error parsing message:', e);
          }
        };

        ws.onerror = (e) => {
          if (!mountedRef.current) return;
          console.error("WebSocket error:", e);
          // Don't set error immediately on connection close as it might be a clean close
        };

        ws.onclose = (e) => {
          if (!mountedRef.current) return;
          console.log("WebSocket closed", e.code, e.reason);
          if (e.code !== 1000 && e.code !== 1005) {
             setStatus('error');
             setErrorMessage(`Connection closed (${e.code})`);
          } else {
             setStatus('disconnected');
          }
        };

      } catch (e) {
        console.error(e);
        setStatus('error');
        setErrorMessage('Failed to create connection');
      }
    };

    connectToGemini();

    return () => {
      mountedRef.current = false;
      recorderRef.current?.stop();
      playerRef.current?.stop();
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const initializeSession = (ws: WebSocket) => {
    const msg = {
      setup: {
        model: "models/gemini-2.0-flash-exp",
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } }
          }
        },
        systemInstruction: {
          parts: [{
            text: `You are the friendly AI assistant for "Little Loaf Bakery". 
            Your goal is to help customers with our menu, hours, and ordering.
            Keep responses concise (1-2 sentences), warm, and helpful.
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

  const startAudio = async (ws: WebSocket) => {
    playerRef.current = new AudioPlayer();
    
    recorderRef.current = new AudioRecorder((base64Data) => {
      if (ws.readyState === WebSocket.OPEN) {
        const msg = {
          realtimeInput: {
            mediaChunks: [{
              mimeType: "audio/pcm",
              data: base64Data
            }]
          }
        };
        ws.send(JSON.stringify(msg));
      }
    });

    try {
      await recorderRef.current.start();
    } catch (e) {
      console.error("Microphone access failed", e);
      setErrorMessage("Microphone access failed");
      setStatus("error");
    }
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
      
      // Reset talking state logic could be improved by listening to audio queue
      setTimeout(() => setIsTalking(false), 2000); 
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-amber-50 relative h-full rounded-b-3xl">
      <div className="text-center mb-12">
        <h3 className="text-xl font-bold text-amber-900 mb-2">Gemini Live</h3>
        <p className={`text-sm font-medium ${status === 'error' ? 'text-red-500' : 'text-amber-700'}`}>
          {status === 'connecting' && 'Connecting...'}
          {status === 'connected' && 'Listening & Ready'}
          {status === 'disconnected' && 'Disconnected'}
          {status === 'error' && (errorMessage || 'Connection Error')}
        </p>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center mb-12">
        <div className={`absolute inset-0 bg-amber-200 rounded-full opacity-30 animate-ping ${isTalking ? 'duration-1000' : 'hidden'}`}></div>
        <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-colors duration-500 ${
          status === 'connected' ? 'bg-amber-600' : status === 'error' ? 'bg-red-500' : 'bg-stone-400'
        }`}>
          {status === 'connecting' ? (
             <Loader2 className="w-12 h-12 text-white animate-spin" />
          ) : status === 'error' ? (
             <AlertCircle className="w-12 h-12 text-white" />
          ) : (
             <Mic className="w-12 h-12 text-white" />
          )}
        </div>
      </div>

      <div className="text-center mb-8 max-w-[200px]">
        <p className="font-medium text-stone-700 text-sm">
          {status === 'error' ? 'Please check your API key and try again.' : 'Speak naturally. You can interrupt me at any time.'}
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
