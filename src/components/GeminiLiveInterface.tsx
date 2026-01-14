"use client";

import React, { useEffect, useState, useRef } from "react";
import { Mic, Square, Loader2, AlertCircle, MessageSquare } from "lucide-react";
import { AudioRecorder, AudioPlayer } from "@/lib/gemini-live";
import { bakeryInfo, menuItems } from "@/data/bakeryData";

interface GeminiLiveInterfaceProps {
  onBack: () => void;
}

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function GeminiLiveInterface({
  onBack,
}: GeminiLiveInterfaceProps) {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<
    "connecting" | "connected" | "error" | "disconnected"
  >("disconnected");
  const [isTalking, setIsTalking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const playerRef = useRef<AudioPlayer | null>(null);
  const mountedRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, []);

  const cleanup = () => {
    recorderRef.current?.stop();
    playerRef.current?.stop();
    recognitionRef.current?.stop();
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      wsRef.current.close();
    }
    saveHistory();
  };

  const handleStart = async () => {
    setIsActive(true);
    setStatus("connecting");
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("your_gemini_api_key")) {
      setErrorMessage("Invalid API Key");
      setStatus("error");
      return;
    }

    const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) {
          ws.close();
          return;
        }

        const userId = localStorage.getItem("bakery_user_id");
        if (userId) {
          fetch(`/api/customer?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => {
              if (!mountedRef.current) return;
              setStatus("connected");
              initializeSession(ws, data);
              startAudio(ws);
              startSpeechRecognition();
            })
            .catch((err) => {
              if (!mountedRef.current) return;
              setStatus("connected");
              initializeSession(ws, null);
              startAudio(ws);
              startSpeechRecognition();
            });
        } else {
          setStatus("connected");
          initializeSession(ws, null);
          startAudio(ws);
          startSpeechRecognition();
        }
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
          console.error("Error parsing message:", e);
        }
      };

      ws.onclose = (e) => {
        if (!mountedRef.current) return;
        if (e.code !== 1000 && e.code !== 1005 && e.code !== 1001) {
          setStatus("error");
          setErrorMessage(`Connection error (${e.code})`);
        } else {
          setStatus("disconnected");
        }
      };
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMessage("Failed to create connection");
    }
  };

  const saveHistory = () => {
    const messagesToSave = transcriptRef.current;

    if (messagesToSave.length > 0) {
      const saved = localStorage.getItem("bakery_chat_history");
      let history = [];
      if (saved) {
        try {
          history = JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }

      // Append voice transcript messages with role mapping
      const formattedVoice = messagesToSave.map((m) => ({
        role: m.role === "model" ? "agent" : "user",
        text: m.text,
        timestamp: new Date().toISOString(),
      }));

      const newHistory = [...history, ...formattedVoice];
      // Keep reasonable limit
      localStorage.setItem(
        "bakery_chat_history",
        JSON.stringify(newHistory.slice(-50))
      );
    }
  };

  const startSpeechRecognition = () => {
    // Browser support check
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      if (text) {
        const msg: ChatMessage = { role: "user", text: text };
        setTranscript((prev) => {
          const newState = [...prev, msg];
          transcriptRef.current = newState;
          return newState;
        });
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error("Speech recognition failed to start", e);
    }
  };

  const initializeSession = (ws: WebSocket, userData: any) => {
    const userContext = userData
      ? `
      CUSTOMER CONTEXT:
      - Name: ${userData.customer?.name || "Unknown"}
      - Preferences: ${userData.customer?.preferences?.join(", ") || "None"}
      - Allergies: ${userData.customer?.allergies?.join(", ") || "None"}
    `
      : "";

    const msg = {
      setup: {
        model: "models/gemini-2.0-flash-exp",
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
          },
        },
        systemInstruction: {
          parts: [
            {
              text: `You are the friendly AI assistant for "Little Loaf Bakery". 
            Your goal is to help customers with our menu, hours, and ordering.
            Keep responses concise (1-2 sentences), warm, and helpful.
            Speak in a friendly, slightly upbeat tone.
            
            ${userContext}
            
            Bakery Info: ${JSON.stringify(bakeryInfo)}
            Menu: ${JSON.stringify(menuItems)}
            `,
            },
          ],
        },
      },
    };
    ws.send(JSON.stringify(msg));
  };

  const startAudio = async (ws: WebSocket) => {
    playerRef.current = new AudioPlayer();

    recorderRef.current = new AudioRecorder((base64Data) => {
      if (ws.readyState === WebSocket.OPEN) {
        const msg = {
          realtimeInput: {
            mediaChunks: [
              {
                mimeType: "audio/pcm;rate=16000",
                data: base64Data,
              },
            ],
          },
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
    // Handle Audio
    if (message.serverContent?.modelTurn?.parts) {
      setIsTalking(true);
      const parts = message.serverContent.modelTurn.parts;

      for (const part of parts) {
        if (
          part.inlineData &&
          part.inlineData.mimeType.startsWith("audio/pcm")
        ) {
          playerRef.current?.play(part.inlineData.data);
        }
        // Handle Text Response from Model
        if (part.text) {
          const msg: ChatMessage = { role: "model", text: part.text };
          setTranscript((prev) => {
            // Avoid duplicate partials if possible, simpler to just append for now
            const newState = [...prev, msg];
            transcriptRef.current = newState;
            return newState;
          });
        }
      }
      setTimeout(() => setIsTalking(false), 2000);
    }
  };

    return (

      <div className="flex-grow flex flex-col items-center justify-between p-6 bg-amber-50 relative h-full rounded-b-3xl">

        {!isActive ? (

          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">

            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mb-2">

              <Mic className="w-10 h-10" />

            </div>

            <div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Ready to talk?</h3>

              <p className="text-stone-600 max-w-[200px] mx-auto text-sm leading-relaxed">

                Click the button below to start your voice session with the bakery assistant.

              </p>

            </div>

            <button 

              onClick={handleStart}

              className="px-8 py-3 bg-amber-700 text-white rounded-full font-bold shadow-lg hover:bg-amber-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"

            >

              Start Conversation

            </button>

          </div>

        ) : (

          <>

            {/* Header */}

            <div className="text-center mt-4">

              <h3 className="text-xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">

                <MessageSquare className="w-5 h-5" /> Gemini Live

              </h3>

              <p

                className={`text-xs font-medium ${

                  status === "error" ? "text-red-500" : "text-amber-700"

                }`}

              >

                {status === "connecting" && "Connecting..."}

                {status === "connected" && "Listening..."}

                {status === "disconnected" && "Disconnected"}

                {status === "error" && (errorMessage || "Connection Error")}

              </p>

            </div>

  

            {/* Visualizer */}

            <div className="relative w-40 h-40 flex items-center justify-center my-4 shrink-0">

              <div

                className={`absolute inset-0 bg-amber-200 rounded-full opacity-30 animate-ping ${

                  isTalking ? "duration-1000" : "hidden"

                }`}

              ></div>

              <div

                className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-colors duration-500 ${

                  status === "connected"

                    ? "bg-amber-600"

                    : status === "error"

                    ? "bg-red-500"

                    : "bg-stone-400"

                }`}

              >

                {status === "connecting" ? (

                  <Loader2 className="w-10 h-10 text-white animate-spin" />

                ) : status === "error" ? (

                  <AlertCircle className="w-10 h-10 text-white" />

                ) : (

                  <Mic className="w-10 h-10 text-white" />

                )}

              </div>

            </div>

  

            {/* Transcript Area */}

            <div className="flex-grow w-full max-w-sm bg-white/60 backdrop-blur-sm rounded-2xl p-4 overflow-y-auto mb-4 border border-amber-100 shadow-inner h-32">

              {transcript.length === 0 ? (

                <p className="text-stone-400 text-sm text-center italic mt-4">

                  Conversation will appear here...

                </p>

              ) : (

                <div className="space-y-3">

                  {transcript.map((msg, i) => (

                    <div

                      key={i}

                      className={`text-sm ${

                        msg.role === "model"

                          ? "text-amber-900"

                          : "text-stone-700 text-right"

                      }`}

                    >

                      <span className="font-bold text-xs uppercase opacity-50 block mb-1">

                        {msg.role === "model" ? "Bakery" : "You"}

                      </span>

                      {msg.text}

                    </div>

                  ))}

                </div>

              )}

            </div>

  

            <button 

              onClick={() => {

                cleanup();

                onBack();

              }}

              className="mt-auto bg-white border border-stone-200 text-stone-600 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors shadow-sm font-medium"

            >

              <Square className="w-4 h-4 fill-current border-none" />

              End Voice Session

            </button>

          </>

        )}

      </div>

    );

  }

  
