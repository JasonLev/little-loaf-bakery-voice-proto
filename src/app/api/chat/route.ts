import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { bakeryInfo, menuItems } from '@/data/bakeryData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({ 
        text: "I'm currently running in demo mode. Please configure the GEMINI_API_KEY to enable my full intelligence!" 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct the context string
    const context = `
      You are the friendly and helpful AI assistant for "Little Loaf Bakery".
      
      Here is the bakery information:
      ${JSON.stringify(bakeryInfo, null, 2)}
      
      Here is the menu:
      ${JSON.stringify(menuItems, null, 2)}
      
      Your Role:
      1. Answer questions about our menu, ingredients, and pricing (assume reasonable prices if not listed, or say "prices vary").
      2. Provide information about hours, location, and pick-up/delivery.
      3. Be warm, inviting, and use emoji occasionally (like 🥖, 🥐, 🍪).
      4. If someone wants to order, ask for their name and email, and list the items they want.
      5. Keep responses concise (under 3 sentences) unless listing the menu.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "System Instruction: " + context }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am ready to serve as the Little Loaf Bakery assistant." }],
        },
        ...history.map((msg: any) => ({
          role: msg.role === 'agent' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ text: response });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ text: "I'm having a little trouble checking the oven right now. Please try again later!" }, { status: 500 });
  }
}
