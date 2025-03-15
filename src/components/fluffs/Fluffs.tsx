import { FluffData } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface FluffProps {
  fluff: FluffData;
}

export default function Fluff({ fluff }: FluffProps) {
  return (
    <Card className="flex w-full flex-col items-center justify-center shadow-xl">
      <CardHeader className="w-full px-2 py-1 md:px-4 md:py-2">
        <div className="flex justify-between">
          <div className="flex items-center justify-center">
            <span className="text-base font-bold">{fluff.name}</span>
          </div>
          <div>
            <Link href={`/fluffs/${fluff.id}/chat`}>
              <Button variant={"ghost"} className="p-0" asChild>
                <MessageCircle />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex w-full items-start justify-between p-0 shadow-2xl">
        <div className="h-full w-full p-4 text-sm font-light md:max-w-[45%]">
          {fluff.description}
        </div>
        <Card className="flex w-full max-w-[30%] items-center justify-center rounded-none rounded-br-lg p-0 shadow-inner">
          <CardContent className="flex w-full items-center justify-center p-1 md:p-2">
            <Image
              src={fluff.image!}
              width={400}
              height={400}
              alt="Fluff"
              className="aspect-square w-full rounded-sm"
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
