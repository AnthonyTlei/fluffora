import coverImage from "@/assets/cover/cover-image-1.webp";
import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const { user: loggedInUser } = await validateRequest();

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
            <Button
              variant={"default"}
              size={"lg"}
              className="w-[75%] sm:w-[50%]"
            >
              <Link href={`/users/${loggedInUser?.id}/fluffs`}>My Fluffs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
