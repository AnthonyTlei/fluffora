"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import kyInstance from "@/lib/ky";
import { FluffsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import FluffsLoadingSkeleton from "./fluffs/FluffsLoadingSkeleton";
import Fluff from "./fluffs/Fluffs";

interface FluffsListProps {
  userid: string;
}

export default function FluffsList({ userid }: FluffsListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["fluffs", `user-${userid}`],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/fluffs/user/${userid}`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<FluffsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const fluffs = data?.pages.flatMap((page) => page.fluffs) || [];

  if (status === "pending") {
    return <FluffsLoadingSkeleton />;
  }

  if (status === "success" && !fluffs.length && !hasNextPage) {
    return <p className="text-center">You have no Fluffs...</p>;
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {fluffs.map((fluff) => (
        <Fluff key={fluff.id} fluff={fluff} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
