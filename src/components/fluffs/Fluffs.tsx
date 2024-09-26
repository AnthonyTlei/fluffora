import { FluffData } from "@/lib/types";

interface FluffProps {
  fluff: FluffData;
}

export default function Fluff({ fluff }: FluffProps) {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1.5">{fluff.name}</div>
      </div>
    </div>
  );
}
