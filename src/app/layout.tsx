import "./globals.css";
import Header from "@/app/components/Header";
import { Metadata } from "next";
import Iridescence from "@/app/components/Iridescence";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
export const metadata: Metadata = {
  title: "Kairon Pictures",
  description:
    "Creative production company specializing in narrative, commercial, fashion, and music video productions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="fixed inset-0 z-0">
          <ErrorBoundary fallback={<div className="w-full h-full bg-black" />}>
            <Iridescence />
          </ErrorBoundary>
        </div>
        <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
          <Header />
          <ErrorBoundary>
            <main className="flex-grow">{children}</main>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
