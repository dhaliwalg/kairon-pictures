import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CONTACT - Kairon Pictures",
  description:
    "Creative production company specializing in narrative, commercial, fashion, and music video productions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
