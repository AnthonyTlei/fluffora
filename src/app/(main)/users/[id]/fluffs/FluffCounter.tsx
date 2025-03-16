"use client";

import { useState } from "react";

interface FluffCounterProps {
  initialCount: number;
  isUnlimited: boolean;
}

export default function FluffCounter({
  initialCount,
  isUnlimited,
}: FluffCounterProps) {
  const [fluffCount, setFluffCount] = useState<number>(initialCount);

  const handleFluffCreated = () => setFluffCount((prev) => prev + 1);
  const handleFluffDeleted = () =>
    setFluffCount((prev) => Math.max(0, prev - 1));

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-secondary p-2 text-sm font-medium text-gray-700 shadow-md">
      <span>You have</span>
      <span className="text-lg font-semibold text-pink-500">{fluffCount}</span>
      {!isUnlimited && <span>/3 Fluffs</span>}
      {isUnlimited && <span>Fluffs</span>}
    </div>
  );
}
