import { NextRequest } from "next/server";
import openai from "@/lib/openai";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fluffName, fluffDescription, fluffTraits, userName, messages } =
      body;

    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const enableChat = user.role === "ADMIN" || user.role === "TESTER";

    const userRecord = await prisma.user.findUnique({
      where: { id: user.id },
      select: { messageCount: true },
    });

    if (!userRecord) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!enableChat && userRecord.messageCount >= 3) {
      return Response.json(
        { error: "Message limit reached. Upgrade to continue chatting." },
        { status: 403 },
      );
    }

    if (!enableChat) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          messageCount: { increment: 1 },
        },
      });
    }

    const formattedTraits =
      fluffTraits && fluffTraits.length > 0
        ? `This fluff has the following personality traits: ${fluffTraits.join(", ")}.`
        : "This fluff does not have specific traits mentioned.";

    const systemMessage = {
      role: "system",
      content: `You are ${fluffName}, a virtual companion. Your personality is based on this description: "${fluffDescription}". 
        ${formattedTraits} Stay in character and engage with ${userName} in a friendly, immersive way.`,
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
