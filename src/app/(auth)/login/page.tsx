import coverImage from "@/assets/cover/cover-image-1.webp";
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
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold text-primary">
            Join the Fluff Battles
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
          <div className="space-y-5">
            <GoogleSignInButton />
          </div>
        </div>
        <Image
          src={coverImage}
          alt="cover image"
          className="hidden h-full w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
