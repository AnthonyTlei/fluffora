import { Skeleton } from "../ui/skeleton";

export default function FluffsLoadingSkeleton() {
  return (
    <div className="space-y-5">
      <FluffLoadingSkeleton />
      <FluffLoadingSkeleton />
      <FluffLoadingSkeleton />
    </div>
  );
}

function FluffLoadingSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded" />
    </div>
  );
}
