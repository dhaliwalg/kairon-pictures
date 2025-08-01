"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import dynamic from 'next/dynamic'; // Make sure this is imported

const DynamicIridescence = dynamic(() => import('./components/Iridescence'), {
  ssr: false, // This is essential
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white h-full`}
        style={{ fontFamily: "var(--font-haffer-sans)" }}
      >
        <div className="fixed inset-0 z-0">
          <DynamicIridescence
            color={[0.8, 0.8, 0.8]}
            speed={0.8}
            amplitude={0.8}
            mouseReact={true}
            mouseRadius={0.8}
            mouseStrength={0.25}
          />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
