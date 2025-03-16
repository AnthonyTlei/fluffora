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
  return (
    <Card className="w-full max-w-2xl rounded-lg shadow-lg">
      <CardHeader className="flex items-center gap-2 bg-secondary p-4 text-lg font-bold text-primary">
        <Lock className="h-5 w-5 text-red-500" />
        AI Chat Disabled
      </CardHeader>

      {/* Chat Messages Area */}
      <ScrollArea className="flex h-96 flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <AlertTriangle className="h-10 w-10 text-yellow-500" />
          <p className="text-lg font-semibold">AI Chat is Unavailable</p>
          <p className="text-sm">
            You don’t have permission to chat with {fluff.name} at the moment.
          </p>
        </motion.div>
      </ScrollArea>

      {/* Disabled Input & Button */}
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
