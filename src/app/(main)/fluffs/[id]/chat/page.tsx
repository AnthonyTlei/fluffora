import { validateRequest } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getFluff } from "../../actions";
import Chat from "@/components/chat/Chat";

interface FluffPageProps {
  params: {
    id: string;
  };
}

const getCachedFluff = cache(async (id: string) => {
  const fluff = await getFluff(id);

  if (!fluff) notFound();

  return fluff;
});

export async function generateMetadata({
  params: { id },
}: FluffPageProps): Promise<Metadata> {
  const fluff = await getCachedFluff(id);

  return {
    title: fluff.name + " - Chat",
    description: fluff.description,
  };
}

export default async function Page({ params: { id } }: FluffPageProps) {
  const { user } = await validateRequest();
  const fluff = await getCachedFluff(id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5 sm:p-4">
        <Card className="z-50 flex h-full w-full flex-col items-center justify-center rounded-none border-0 bg-secondary opacity-75 shadow-2xl sm:rounded-lg">
          <CardContent className="flex w-full flex-col items-center justify-center p-4">
            <h1 className="text-center text-2xl font-bold">
              {fluff.name} - Chat
            </h1>
            <Chat fluff={fluff} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
