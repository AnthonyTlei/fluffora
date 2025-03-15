import { NextRequest } from "next/server";
import openai from "@/lib/openai";
import { validateRequest } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fluffName, fluffDescription, userName, messages } = body;

    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const systemMessage = {
      role: "system",
      content: `You are ${fluffName}, a virtual companion. Your personality is based on this description: "${fluffDescription}". 
        Stay in character and engage with ${userName} in a friendly, immersive way.`,
    };

    const openaiMessages = [systemMessage, ...messages.slice(-6)];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openaiMessages,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(text);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
