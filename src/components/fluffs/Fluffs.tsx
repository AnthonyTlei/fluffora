import { FluffData } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Badge as BadgeIcon, Edit, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import FluffTrait from "./FluffTrait";

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
          <div className="flex gap-2">
            <Link href={`/fluffs/${fluff.id}/edit`}>
              <Button variant={"ghost"} className="p-0" asChild>
                <Edit />
              </Button>
            </Link>
            <Link href={`/fluffs/${fluff.id}/chat`}>
              <Button variant={"ghost"} className="p-0" asChild>
                <MessageCircle />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex w-full items-start justify-between p-0">
        <div className="h-full w-full p-4 text-sm font-light md:max-w-[45%]">
          <span className="line-clamp-4">{fluff.description}</span>
        </div>
        <Card className="flex w-full max-w-[30%] items-center justify-center rounded-none rounded-br-lg p-0">
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
      <Separator />
      <CardFooter className="flex h-full w-full gap-2 px-4 py-2 text-sm font-light">
        {fluff.traits.length !== 0 && (
          <div className="flex flex-wrap gap-2">
            {fluff.traits?.map((trait, index) => (
              <FluffTrait key={index} title={trait} />
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
