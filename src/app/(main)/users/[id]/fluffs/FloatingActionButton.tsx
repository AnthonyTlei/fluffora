"use client";

import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CreateFluffDialog from "./CreateFluffDialog";
import { useState } from "react";

export default function FloatingActionButton() {
  const [showCreateFluffDialog, setShowCreateFluffDialog] = useState(false);
  return (
    <>
      <Card className="absolute bottom-2 right-2 aspect-square rounded-full p-2 shadow-2xl hover:cursor-pointer">
        <Plus size={24} onClick={() => setShowCreateFluffDialog(true)} />
      </Card>
      <CreateFluffDialog
        open={showCreateFluffDialog}
        onClose={() => setShowCreateFluffDialog(false)}
      />
    </>
  );
}
