"use client";

import { useState, useEffect } from "react";
import { FluffData } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";

interface ChatProps {
  fluff: FluffData;
}

export default function Chat({ fluff }: ChatProps) {
  const { messages, input, setInput, sendMessage, loading, chatEndRef } =
    useChat(fluff);

  const messageLimit = 3;
  const isUnlimited =
    fluff.user.role === "ADMIN" || fluff.user.role === "TESTER";

  const [messageCount, setMessageCount] = useState(fluff.user.messageCount);

  async function handleSendMessage() {
    if (!input.trim() || loading) return;

    await sendMessage();

    setMessageCount((prev) => prev + 1);
  }

  const remainingMessages = Math.max(0, messageLimit - messageCount);

  return (
    <Card className="w-full max-w-2xl rounded-lg shadow-lg">
      <CardHeader className="bg-secondary p-4 text-lg font-bold text-primary">
        Chat with {fluff.name}
      </CardHeader>

      <ScrollArea className="h-96 p-4">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-xs rounded-lg p-3 text-sm shadow-md ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-black"
              }`}
            >
              <strong>
                {msg.role === "user" ? fluff.user.displayName : fluff.name}:
              </strong>{" "}
              {msg.content}
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </ScrollArea>

      <CardContent className="flex flex-col gap-1 border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={loading || (!isUnlimited && remainingMessages <= 0)}
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || (!isUnlimited && remainingMessages <= 0)}
          >
            {loading ? "..." : "Send"}
          </Button>
        </div>

        {!isUnlimited && (
          <p className="text-center text-xs text-gray-500">
            {remainingMessages > 0 ? (
              <>
                You have{" "}
                <span className="font-semibold">{remainingMessages}</span>{" "}
                messages left.
              </>
            ) : (
              <>
                You&apos;ve used all{" "}
                <span className="font-semibold">{messageLimit}</span> messages.
              </>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
