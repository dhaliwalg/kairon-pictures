import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaggerContainer } from "../hooks/useStaggerAnimation";

export const metadata = {
  title: "ABOUT - Kairon Pictures",
  description: "Learn about Kairon Pictures, our mission, and our team.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center text-black px-0 py-0">
      <div className="w-full max-w-[1200px] px-6 sm:px-12 md:px-24 lg:px-32 xl:px-40 pt-24 sm:pt-32 md:pt-40 pb-16 mx-auto">
        {/* Main description with stagger animation */}
        <StaggerContainer
          className="mb-8 sm:mb-12 font-sans"
          options={{
            delay: 0.1,
            stagger: 0.2,
            duration: 0.8,
            from: "start",
            y: 40,
            selector: ".description-paragraph",
            setInitialStyles: false, // CSS handles initial styles
          }}
        >
          <div className="description-paragraph">
            <p className="text-base sm:text-lg md:text-[22px] leading-[1.4] sm:leading-[1.3] tracking-[0.01em] font-normal mb-6 sm:mb-8">
              <span className="font-bold">KAIRON PICTURES</span> represents the
              next generation of filmmakers focused on hand-made experiences in
              a world of cookie-cutter content. We strive in crafting narratives
              that resonate with audiences everywhere, while translating the
              visions of our clients into a tangible reality we can all consume.
            </p>
          </div>
          <div className="description-paragraph">
            <p className="text-sm sm:text-base md:text-[16px] leading-[1.5] sm:leading-[1.4] tracking-[0.01em] mb-6 sm:mb-8 text-black font-extrabold">
              <span className="font-semibold">
                Derived from the Greek word καιρός{" "}
              </span>
              <span className="font-mono text-xs sm:text-sm md:text-[14px] tracking-wider">
                /ˈkaɪ.rɒs/
              </span>
              <span className="font-semibold">
                , we represent the season of action; we don&apos;t wait for it,
                we are the action.
              </span>
            </p>
          </div>
        </StaggerContainer>

        {/* Partners section with stagger animation */}
        <StaggerContainer
          className="mb-12 sm:mb-16 md:mb-12"
          options={{
            delay: 0.5,
            stagger: 0.1,
            duration: 0.7,
            from: "center",
            y: 30,
            scale: 0.9,
            selector: ".partner-logo",
            setInitialStyles: false, // CSS handles initial styles
          }}
        >
          {/* Mobile: 2x3 grid, Desktop: single row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-4 sm:gap-y-6 mb-4">
            <div className="partner-logo">
              <Image
                src="/sony.png"
                alt="Sony"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/tribeca.png"
                alt="Tribeca Festival"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/dga.png"
                alt="DGA"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/nascar.png"
                alt="NASCAR"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/berlin.png"
                alt="BERLIN"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/shortlist.png"
                alt="Shortlist"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
          </div>
        </StaggerContainer>

        {/* Call to action with stagger animation */}
        <StaggerContainer
          className="text-center mb-8 sm:mb-12 text-white"
          options={{
            delay: 1.0,
            duration: 0.8,
            y: 30,
            selector: ".cta-text",
            setInitialStyles: false, // CSS handles initial styles
          }}
        >
          <div className="cta-text">
            <p className="text-lg sm:text-xl md:text-[24px] font-normal">
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
        </StaggerContainer>
      </div>
    </div>
  );
}