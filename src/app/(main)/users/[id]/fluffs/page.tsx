import coverImage from "@/assets/cover/cover-image-1.webp";
import { validateRequest } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { id: string };
}

const getUser = cache(async (id: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
    select: getUserDataSelect(loggedInUserId),
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

  return {
    title: `${user.displayName}`,
  };
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

  return (
    <main className="flex w-full min-w-0 gap-5">
      <Image
        src={coverImage}
        alt="logo"
        width={400}
        height={400}
        className="absolute left-0 top-0 z-[-1] h-full w-full object-cover opacity-50 sm:rounded-lg"
      />
      <div className="w-full min-w-0 space-y-5 sm:p-4">
        <Card className="z-50 flex h-full w-full flex-col items-center justify-center rounded-none border-0 bg-secondary opacity-75 shadow-2xl sm:rounded-lg">
          <CardContent className="flex w-full flex-col items-center justify-center p-4">
            Your fluffies
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
