# Little Loaf Bakery Website with Voice

## Intro

The voice agent in the Little Loaf Bakery project is a sophisticated, real-time AI concierge powered by the latest
Gemini 2.0 Multimodal Live API.

Here is a summary of its core capabilities:

1. Natural Real-Time Conversation

- Low Latency: Uses direct WebSockets (wss://) to communicate with Gemini 2.0, allowing for fluid, "human-like"
  conversation speeds without the delay of traditional text-to-speech systems.
- Gemini 2.0 Flash: Leverages Google's newest experimental multimodal model, capable of understanding nuances in voice
  and responding with a warm, artisanal tone suitable for a neighborhood bakery.
- Interruption Handling: Because it's a live stream, users can speak over the agent or interrupt it naturally, just
  like a real phone call.

2. Deep Bakery Knowledge (Contextual Intelligence)

- Full Menu Awareness: The agent knows every sourdough loaf, cookie, and seasonal pie, including specific ingredients
  and stock status.
- Business Operations: It can accurately answer questions about West LA pick-up times, delivery options, and the
  bakery's "Kosher kitchen" philosophy.
- Brand Persona: It is specifically instructed to act as a "warm, inviting, and professional" family-run business
  representative.

3. Persistent Customer Memory

- Cross-Session Recognition: Using a persistent userId stored in the browser, the agent remembers the customer.
- Personalization: If a user mentions their name or a preference (e.g., "I love my sourdough extra dark" or "I have a
  nut allergy"), the agent saves these facts and references them in future conversations to create a "neighborhood
  regular" feel.

4. Visual Transcription & History

- Live Transcript: As the user speaks, the agent provides a real-time text display of the conversation within the UI,
  ensuring clarity even in noisy environments.
- Conversation Logs: Every voice session is automatically saved to the browser’s localStorage. Users can toggle to the
  Chat History tab to read through previous interactions, complete with date/time stamps.

5. Privacy & User Control

- Click-to-Talk: The agent does not listen immediately upon opening the site. It features a "Ready to talk?" splash
  screen that requires a deliberate user click to activate the microphone.
- Visual Feedback: A pulsating visualizer indicates exactly when the agent is listening and when it is speaking.

6. High-Performance Audio Engine

- Custom Audio Pipeline: The project includes a dedicated browser-side engine that handles 16kHz PCM audio recording
  and 24kHz playback, optimized specifically for the Gemini Multimodal API's requirements.

In short, it’s not just a "voice bot"—it’s a stateful, personalized digital employee that can handle everything from
menu inquiries to remembering a customer's favorite bread.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
