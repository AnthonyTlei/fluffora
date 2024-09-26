import { FluffData } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

interface FluffProps {
  fluff: FluffData;
}

export default function Fluff({ fluff }: FluffProps) {
  return (
    <Card>
      <CardContent className="flex w-full flex-col items-center justify-center p-0 shadow-2xl">
        <CardHeader>
          <Image
            src={fluff.image!}
            width={400}
            height={400}
            alt="Fluff"
            className="aspect-square w-full max-w-[100dvh] rounded-lg shadow-xl"
          />
          <span>{fluff.name}</span>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
