import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Iridescence from "./components/Iridescence";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kairon Pictures",
  description:
    "Creative production company specializing in narrative, commercial, fashion, and music video productions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black h-full`}
      >
        <div className="fixed inset-0 z-0">
          <Iridescence
            color={[0.61, 0.59, 0.8]}
            speed={0.8}
            amplitude={0.8}
            mouseReact={true}
            mouseRadius={0.8}
            mouseStrength={0.25}
          />
        </div>
        {/* This div contains ALL foreground UI (Header, main content). */}
        {/* It must have pointer-events-none to allow events to pass through to Iridescence. */}
        {/* Then, re-enable pointer-events for specific interactive elements within it. */}
        <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
