import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our narrative, commercial, and music video productions.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
