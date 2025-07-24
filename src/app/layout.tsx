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
  description: "Creative production company specializing in narrative, commercial, fashion, and music video productions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-black h-full`}>
        {/* Iridescence background - it needs to be the target of mouse events */}
        {/* z-0 is fine, but it needs to be the 'highest' element capable of receiving events */}
        <div className="fixed inset-0 z-0">
     <Iridescence
        color={[0.6, 0.6, 1.0]} // Example color
        speed={0.8}
        amplitude={0.15}  
        mouseReact={true}
        mouseRadius={0.4}   // Adjust for wider/narrower influence
        mouseStrength={0.20} // Adjust for stronger/weaker push
      />
        </div>

        {/* This div contains ALL your foreground UI (Header, main content). */}
        {/* It must have pointer-events-none to allow events to pass through to Iridescence. */}
        {/* Then, re-enable pointer-events for specific interactive elements within it. */}
        <div className="relative z-10 min-h-screen flex flex-col pointer-events-none"> {/* ADDED pointer-events-none */}
          
          {/* Header needs its interactive elements to work, so we re-enable pointer events */}
          <Header/> {/* We'll modify Header.tsx too */}
          
          <main className="flex-grow">
            {children} {/* This content also needs pointer-events-auto for interactions */}
          </main>
        </div>
      </body>
    </html>
  );
}