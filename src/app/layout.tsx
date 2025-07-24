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
        <div className="fixed inset-0 z-0">
          <Iridescence
            color={[0.64, 0.59, 0.8]} 
            amplitude={0.1}
            speed={1.0}
            mouseReact={true}
          />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}