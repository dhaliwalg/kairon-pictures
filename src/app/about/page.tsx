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
              Kairon Pictures is a production company driven by instinct and
              intention. We create narrative films, commercials, music videos,
              and anything that makes our hearts race. <br />
              <br />
              We lead with taste, not trends, crafting tailor-made work for
              collaborators who share our obsession with the bold, the visually
              striking, and the emotionally honest. Our standard is simple: if
              it doesn&apos;t move us, it doesn&apos;t make the cut. <br />
              <br />
              Our team of award-winning directors and producers represents the
              next generation of storytelling, with recognition from the Tribeca
              Festival, the Directors Guild of America, Cannes Lions, and more.
            </p>
          </div>
        </StaggerContainer>

        {/* Partners section with stagger animation - Updated to match reference */}
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
          {/* Fixed 2x5 grid layout to match reference */}
          <div className="space-y-8 md:space-y-12">
            {/* Top row */}
            <div className="flex items-center justify-between gap-4 md:gap-8">
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/1.4.png"
                  alt="1.4"
                  width={120}
                  height={60}
                  className="max-h-[40px] md:max-h-[60px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/tribeca.png"
                  alt="Tribeca"
                  width={160}
                  height={60}
                  className="max-h-[40px] md:max-h-[60px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/dga.png"
                  alt="DGA"
                  width={100}
                  height={100}
                  className="max-h-[50px] md:max-h-[80px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/berlin.png"
                  alt="Berlin"
                  width={140}
                  height={80}
                  className="invert max-h-[45px] md:max-h-[70px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/yda.png"
                  alt="YDA"
                  width={100}
                  height={100}
                  className="invert max-h-[50px] md:max-h-[80px] w-auto object-contain"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between gap-4 md:gap-8">
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/sony.png"
                  alt="Sony"
                  width={140}
                  height={60}
                  className="max-h-[35px] md:max-h-[50px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/nascar.png"
                  alt="NASCAR"
                  width={200}
                  height={80}
                  className="max-h-[60px] md:max-h-[90px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/appletv.png"
                  alt="Apple TV"
                  width={120}
                  height={60}
                  className="max-h-[32px] md:max-h-[48px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/jgr.png"
                  alt="JGR"
                  width={140}
                  height={60}
                  className="max-h-[30px] md:max-h-[45px] w-auto object-contain"
                />
              </div>
              <div className="partner-logo flex items-center justify-center flex-1">
                <Image
                  src="/alamo.png"
                  alt="Alamo Records"
                  width={200}
                  height={80}
                  className="max-h-[60px] md:max-h-[90px] w-auto object-contain"
                />
              </div>
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
