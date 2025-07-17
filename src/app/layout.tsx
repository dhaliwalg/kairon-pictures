import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keeping Geist as it's already defined
import "./globals.css";
import Header from "./components/Header"; // Import the Header component
import InteractiveLiquidBackground from "./components/InteractiveLiquidHomepage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kairon Pictures", // Updated title [cite: 1]
  description: "Creative production company specializing in narrative, commercial, fashion, and music video productions.", // Updated description [cite: 23]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 text-black`}> {/* Set background and text color */}
        <InteractiveLiquidBackground/>
        <Header/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}