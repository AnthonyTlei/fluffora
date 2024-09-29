import { FluffData } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";

interface FluffProps {
  fluff: FluffData;
}

export default function Fluff({ fluff }: FluffProps) {
  return (
    <Card className="flex w-full flex-col items-center justify-center shadow-xl">
      <CardHeader className="w-full px-4 py-2">
        <div>
          <span className="text-base font-bold">{fluff.name}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex w-full items-start justify-between p-0 shadow-2xl">
        <div className="h-full w-full max-w-[45%] p-4 text-sm">About</div>
        <Card className="flex w-full max-w-[50%] items-center justify-center rounded-none rounded-br-lg p-0 shadow-inner">
          <CardContent className="flex w-full items-center justify-center p-2">
            <Image
              src={fluff.image!}
              width={400}
              height={400}
              alt="Fluff"
              className="aspect-square w-full"
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
