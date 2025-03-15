import { Metadata } from "next";
import Image from "next/image";
import GoogleSignInButton from "./google/google-login-button";
import logo from "@/assets/logo/logo.webp";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full w-full overflow-hidden rounded-2xl bg-card shadow-2xl md:max-h-[40rem] md:max-w-[64rem]">
        <div className="flex flex-col justify-around space-y-10 overflow-y-auto p-12 md:w-1/2 lg:w-full lg:flex-row lg:items-center lg:justify-around">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-3xl font-bold text-primary">
              Bring Your Fluff Buddies to Life!
            </h1>
            <div className="flex w-full items-center justify-center p-0">
              <Image
                src={logo}
                alt="logo"
                width={400}
                height={400}
                className="h-24 w-24 rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="space-y-5">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </main>
  );
}
