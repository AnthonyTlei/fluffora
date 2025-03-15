"use client";

import { useState, useEffect, useRef } from "react";
import ky from "ky";
import { FluffData } from "@/lib/types";

interface ChatProps {
  fluff: FluffData;
}

export default function Chat({ fluff }: ChatProps) {
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

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col rounded-lg bg-primary p-4 shadow-lg">
      <div className="h-96 space-y-2 overflow-y-auto border-b p-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs rounded-lg p-2 ${
              msg.role === "user"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-black"
            }`}
          >
            <strong>
              {msg.role === "user" ? fluff.user.displayName : fluff.name}:
            </strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex items-center gap-2 p-2">
        <input
          type="text"
          className="flex-1 rounded-lg border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
