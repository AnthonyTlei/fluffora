"use client";

import { FluffData } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface DisabledChatProps {
  fluff: FluffData;
}

export default function DisabledChat({ fluff }: DisabledChatProps) {
  const messageLimit = 3;
  const usedMessages = fluff.user.messageCount;
  const remainingMessages = Math.max(0, messageLimit - usedMessages);

  return (
    <Card className="w-full max-w-2xl rounded-lg shadow-lg">
      <CardHeader className="flex items-center gap-2 bg-secondary p-4 text-lg font-bold text-primary">
        <Lock className="h-5 w-5 text-red-500" />
        AI Chat Disabled
      </CardHeader>

      <ScrollArea className="flex h-96 flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-3 text-gray-500"
        >
          <AlertTriangle className="h-10 w-10 text-yellow-500" />
          <p className="text-lg font-semibold">Message Limit Reached</p>
          <p className="text-sm">
            You’ve used <span className="font-bold">{usedMessages}</span>/
            {messageLimit} messages.
          </p>
          <p className="text-xs text-gray-400">
            Your current limit is{" "}
            <span className="font-bold">{messageLimit}</span> messages.
          </p>
        </motion.div>
      </ScrollArea>

      <CardContent className="flex items-center gap-2 border-t p-4 opacity-50">
        <Input
          type="text"
          placeholder="Chat is disabled..."
          className="flex-1 cursor-not-allowed"
          disabled
        />
        <Button disabled className="cursor-not-allowed">
          Send
        </Button>
      </CardContent>
    </Card>
  );
}
