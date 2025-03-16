"use client";

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

      <CardContent className="flex items-center gap-2 border-t p-4">
        <Input
          type="text"
          placeholder="Type a message..."
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </Button>
      </CardContent>
    </Card>
  );
}
