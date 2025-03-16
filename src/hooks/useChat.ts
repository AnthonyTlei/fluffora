"use client";

import { useState, useEffect, useRef } from "react";
import ky from "ky";
import { FluffData } from "@/lib/types";

export function useChat(fluff: FluffData) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    setLoading(true);

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          fluffId: fluff.id,
          fluffName: fluff.name,
          fluffDescription: fluff.description,
          fluffTraits: fluff.traits,
          userName: fluff.user.displayName,
          messages: [...messages, userMessage],
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiMessage = { role: "assistant", content: "" };

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          aiMessage.content += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            return lastMessage?.role === "assistant"
              ? [...prev.slice(0, -1), aiMessage]
              : [...prev, aiMessage];
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
    setLoading(false);
  }

  return {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    chatEndRef,
  };
}
