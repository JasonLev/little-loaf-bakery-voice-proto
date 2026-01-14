import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from '@google/generative-ai';
import { bakeryInfo, menuItems } from '@/data/bakeryData';

const tools = [
  {
    functionDeclarations: [
      {
        name: "place_order",
        description: "Place a new order for the customer.",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            items: {
              type: FunctionDeclarationSchemaType.ARRAY,
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  name: { type: FunctionDeclarationSchemaType.STRING },
                  quantity: { type: FunctionDeclarationSchemaType.NUMBER }
                },
                required: ["name", "quantity"]
              }
            }
          }
        }
      }
    ]
  }
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return NextResponse.json({ text: "API Key missing" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      tools: tools
    });

    const context = `
      You are the friendly assistant for "Little Loaf Bakery".
      
      BAKERY INFO:
      ${JSON.stringify(bakeryInfo, null, 2)}
      
      MENU:
      ${JSON.stringify(menuItems, null, 2)}
      
      ROLE:
      - Be warm and personal.
      - If the history contains their name or preferences, USE THEM.
      - You can process orders but for now just confirm the details to the user.
    `;

    // Map client history to Gemini format
    const chatHistory = (history || []).map((h: any) => ({
      role: h.role === 'agent' ? 'model' : 'user',
      parts: [{ text: h.text }]
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System Context: " + context }] },
        { role: "model", parts: [{ text: "Understood." }] },
        ...chatHistory.slice(-20) // Send last 20 messages for context
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ text: "I'm having a little trouble checking the oven." }, { status: 500 });
  }
}
