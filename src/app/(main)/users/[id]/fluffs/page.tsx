import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import FloatingActionButton from "./FloatingActionButton";
import FluffsList from "@/components/FluffsList";
import FluffCounter from "./FluffCounter";

interface PageProps {
  params: { id: string };
}

const getUser = cache(async (id: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: { equals: id } },
    select: {
      ...getUserDataSelect(loggedInUserId),
      _count: { select: { Fluff: true } },
      role: true,
    },
  });

  if (!user) notFound();
  return user;
});

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) return {};
  const user = await getUser(id, loggedInUser.id);
  return { title: `${user.displayName}` };
}

export default async function Page({ params: { id } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  const user = await getUser(id, loggedInUser.id);
  const isUnlimited = user.role === "ADMIN" || user.role === "TESTER";
  const fluffCount = user._count.Fluff;

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-3 p-2 sm:p-4">
        <FluffCounter initialCount={fluffCount} isUnlimited={isUnlimited} />
        <FluffsList userid={id} />
      </div>
      <FloatingActionButton />
    </main>
  );
}
