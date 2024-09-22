import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "./ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fluff Battles",
    default: "Fluff Battles",
  },
  description:
    "Fluff Battles is an adorable and exciting card game where players collect and battle with custom characters inspired by fluffy, cute plushies. Each character card features unique stats and abilities, allowing for strategic play and endless fun. Designed to be both lighthearted and competitive, Fluff Battles brings the charm of plush toys into a colorful and engaging digital world, where players can create their own custom cards and challenge others in friendly, fluff-filled showdowns!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
