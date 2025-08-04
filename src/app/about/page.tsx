import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaggerContainer } from "@/app/hooks/useStaggerAnimation";

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
            setInitialStyles: false,
          }}
        >
          <div className="description-paragraph">
            <p className="text-base sm:text-lg md:text-[22px] leading-[1.4] sm:leading-[1.3] tracking-[0.01em] font-normal mb-6 sm:mb-8">
              This is sample text that will be replaced with the new bio
              content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
            setInitialStyles: false,
          }}
        >
          {/* Mobile: 2x5 grid, Desktop: 2 rows */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-center gap-4 sm:gap-6 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-4 sm:gap-y-6 mb-4">
            <div className="partner-logo">
              <Image
                src="/1.4.png"
                alt="1.4"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/tribeca.png"
                alt="Tribeca"
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
                src="/berlin.png"
                alt="Berlin"
                width={250}
                height={80}
                className="invert h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/yda.png"
                alt="YDA"
                width={250}
                height={80}
                className="invert h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
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
                src="/nascar.png"
                alt="NASCAR"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/appletv.png"
                alt="Apple TV"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/jgr.png"
                alt="JGR"
                width={250}
                height={80}
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 w-auto object-contain flex-shrink-0 mx-auto"
              />
            </div>
            <div className="partner-logo">
              <Image
                src="/alamo.png"
                alt="Alamo Records"
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
            setInitialStyles: false,
          }}
        >
          <div className="cta-text text-black">
            <p className="text-lg sm:text-xl md:text-[24px] font-normal">
              <span>Become a </span>
              <Link
                href="/contact"
                className="font-bold hover:underline pointer-events-auto"
              >
                KAIRONIAC
              </Link>
              <span> →</span>
            </p>
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
}
