"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { projectsData } from "../data/projects";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear refs array
    titlesRef.current = [];

    // Set initial state for all titles
    const titles = containerRef.current.querySelectorAll(".project-title");
    titles.forEach((title) => {
      gsap.set(title, {
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.9,
      });
    });

    // Create timeline for staggered entrance
    const tl = gsap.timeline();

    tl.to(titles, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 2,
      stagger: {
        amount: 3,
        from: "random",
      },
      ease: "power2.out",
    });

    // Add ambient blur animation after entrance
    tl.to(
      titles,
      {
        filter: "blur(2px)",
        duration: 1.5,
        stagger: {
          amount: 2,
          from: "random",
        },
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
      "+=1",
    );

    // Add mouse enter/leave handlers
    titles.forEach((title) => {
      const element = title as HTMLElement;

      const handleMouseEnter = () => {
        gsap.killTweensOf(element);
        gsap.to(element, {
          filter: "blur(0px)",
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          filter: "blur(2px)",
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Restart ambient animation
            gsap.to(element, {
              filter: "blur(2px)",
              duration: 1.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          },
        });
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      gsap.killTweensOf(titles);
      titles.forEach((title) => {
        const element = title as HTMLElement;
        element.removeEventListener("mouseenter", () => {});
        element.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  // Generate random positions for titles
  const getRandomPosition = (index: number) => {
    const positions = [
      { top: "15%", left: "10%" },
      { top: "25%", right: "15%" },
      { top: "40%", left: "5%" },
      { bottom: "30%", right: "10%" },
      { bottom: "15%", left: "20%" },
      { top: "60%", right: "25%" },
      { top: "70%", left: "15%" },
      { bottom: "40%", left: "8%" },
      { top: "35%", right: "5%" },
      { bottom: "20%", right: "30%" },
      { top: "80%", right: "12%" },
      { bottom: "60%", left: "25%" },
    ];

    return positions[index % positions.length];
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Project titles scattered around */}
      {projectsData.map((project, index) => {
        const position = getRandomPosition(index);
        return (
          <Link
            key={project.id}
            href={`/work/${project.id.toString()}`}
            className="project-title absolute cursor-pointer select-none pointer-events-auto"
            style={position}
          >
            <span className="text-white/80 text-lg md:text-2xl font-light tracking-wide hover:text-white transition-colors duration-300">
              {project.title}
            </span>
          </Link>
        );
      })}

      {/* Central logo/brand */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold tracking-wider text-white opacity-90 mix-blend-difference">
            K
          </div>
          <div className="text-6xl md:text-8xl font-bold tracking-wider text-white opacity-90 mix-blend-difference">
            P
          </div>
        </div>
      </div>
    </div>
  );
}
