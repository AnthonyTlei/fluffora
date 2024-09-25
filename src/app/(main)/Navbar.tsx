import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.webp";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-0 sm:justify-center">
        <Link href="/" className="p-0 text-2xl font-bold text-primary">
          <div className="flex h-14 items-center justify-center gap-4 p-0 sm:h-16">
            <Image
              src={logo}
              alt="logo"
              width={400}
              height={400}
              className="aspect-square h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
            />
            <span className="text-lg font-bold sm:text-xl">Fluff Battles</span>
          </div>
        </Link>
        <UserButton className="ms-auto flex" />
      </div>
    </header>
  );
}
