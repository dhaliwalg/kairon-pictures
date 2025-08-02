import React from "react";
import Image from "next/image";
import Link from "next/link";
import SubtleTextAnimation from "../components/SubtleTextAnimation";

export const metadata = {
  title: "ABOUT - Kairon Pictures",
  description: "Learn about Kairon Pictures, our mission, and our team.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center text-black px-0 py-0">
      <div className="w-full max-w-[1200px] px-24 md:px-32 lg:px-40 xl:px-48 pt-40 pb-16 mx-auto">
        {/* Main description with subtle animation */}
        <SubtleTextAnimation intensity="subtle">
          <div className="mb-12 font-sans">
            <p className="text-[22px] leading-[1.3] tracking-[0.01em] font-normal mb-8">
              <span className="font-bold">KAIRON PICTURES</span> represents the
              next generation of filmmakers focused on hand-made experiences in
              a world of cookie-cutter content. We strive in crafting narratives
              that resonate with audiences everywhere, while translating the
              visions of our clients into a tangible reality we can all consume.
            </p>
            <p className="text-[16px] leading-[1.4] tracking-[0.01em] mb-8 text-black font-extrabold">
              <span className="font-semibold">
                Derived from the Greek word καιρός{" "}
              </span>
              <span className="font-mono text-[14px] tracking-wider">
                /ˈkaɪ.rɒs/
              </span>
              <span className="font-semibold">
                , we represent the season of action; we don&apos;t wait for it,
                we are the action.
              </span>
            </p>
          </div>
        </SubtleTextAnimation>

        {/* Partners section - no animation on logos */}
        <div className="mb-12">
          {/* Optimized: flex-wrap to allow logos to wrap, justify-center for alignment */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16 mb-4">
            <Image
              src="/sony.png"
              alt="Sony"
              width={250}
              height={80}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
            <Image
              src="/tribeca.png"
              alt="Tribeca Festival"
              width={250}
              height={80}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
            <Image
              src="/dga.png"
              alt="DGA"
              width={250}
              height={80}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
            <Image
              src="/nascar.png"
              alt="NASCAR"
              width={250}
              height={80}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
            <Image
              src="/berlin.png"
              alt="BERLIN"
              width={250}
              height={80}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
            <Image
              src="/shortlist.png"
              alt="Shortlist"
              width={250}
              height={80}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
          </div>
        </div>

        {/* Call to action with subtle animation */}
        <SubtleTextAnimation intensity="subtle">
          <div className="text-center mb-12 text-white">
            <p className="text-[24px] font-normal">
              <em>Become a </em>
              <Link
                href="/contact"
                className="font-bold hover:underline pointer-events-auto"
              >
                KAIRONIAC
              </Link>
              <span className="text-white"> →</span>
            </p>
          </div>
        </SubtleTextAnimation>
      </div>
    </div>
  );
}
