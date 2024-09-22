import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.webp";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-0 sm:justify-center">
        <Link href="/" className="p-0 text-2xl font-bold text-primary">
          <div className="flex h-16 items-center justify-center gap-4 p-0">
            <Image
              src={logo}
              alt="logo"
              width={400}
              height={400}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-xl font-bold">Fluff Battles</span>
          </div>
        </Link>
        <UserButton className="hidden sm:ms-auto md:flex" />
      </div>
    </header>
  );
}
