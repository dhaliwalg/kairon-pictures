"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Project, projectsData } from "../data/projects";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const backgroundMediaRef = useRef<HTMLDivElement>(null);
  const currentMediaRef = useRef<HTMLVideoElement | HTMLImageElement | null>(
    null,
  );
  const logoRef = useRef<HTMLDivElement>(null);
  const ambientTimelinesRef = useRef<gsap.core.Timeline[]>([]);

  // Add a unique ID system to track media elements
  const mediaIdRef = useRef<number>(0);
  const currentMediaIdRef = useRef<number | null>(null);

  const desiredProjectTitles = [
    "Doritos Mortis",
    "Graywind Blinds",
    "More - Jordan Webb ft. Luey Northern",
    "Nigaam Jewels",
    "Pass Go - Jordan Webb",
    "Damien's Gym",
  ];

  // Filter projectsData to get only the desired projects
  const limitedProjects: Project[] = projectsData.filter((project) =>
    desiredProjectTitles.includes(project.title),
  );

  // Create ambient movement for titles - organic floating like leaves on water
  const createAmbientMotion = (immediate = false) => {
    if (!containerRef.current) return;

    const titles = containerRef.current.querySelectorAll(".project-title");

    // Clear existing ambient timelines
    ambientTimelinesRef.current.forEach((tl) => tl.kill());
    ambientTimelinesRef.current = [];

    titles.forEach((title) => {
      // Create continuous floating animation for each title
      const animateTitle = () => {
        // Generate random target position within a floating radius
        const floatRadius = 15 + Math.random() * 25; // 15-40px radius
        const angle = Math.random() * Math.PI * 2; // Random direction
        const distance = Math.random() * floatRadius; // Random distance within radius

        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        const targetRotation = (Math.random() - 0.5) * 6; // -3 to +3 degrees
        const targetScale = 0.98 + Math.random() * 0.04; // 0.98 to 1.02

        // Random duration for each movement
        const duration = 2 + Math.random() * 4; // 2-6 seconds per movement

        gsap.to(title, {
          x: targetX,
          y: targetY,
          rotation: targetRotation,
          scale: targetScale,
          duration: duration,
          ease: "sine.inOut",
          onComplete: () => {
            // Immediately start next random movement
            if (ambientTimelinesRef.current.length > 0) {
              // Check if still active
              animateTitle();
            }
          },
        });
      };

      // Start each title's animation with a random delay (unless immediate is true)
      const startDelay = immediate ? 0 : Math.random() * 3; // 0-3 second stagger
      gsap.delayedCall(startDelay, animateTitle);

      // Keep track of this animation (we'll use the delayedCall for cleanup)
      ambientTimelinesRef.current.push(gsap.timeline());
    });
  };

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Capture ref values for cleanup
    const logoElement = logoRef.current;
    const titles = containerRef.current.querySelectorAll(".project-title");

    // Clear refs array
    titlesRef.current = [];

    // Set initial state for logo
    gsap.set(logoElement, {
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.9,
    });

    // Set initial state for all titles
    titles.forEach((title) => {
      gsap.set(title, {
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.9,
      });
    });

    // Create master timeline
    const masterTl = gsap.timeline({ delay: 0.75 });

    // First: Animate the logo in
    masterTl
      .to(logoElement, {
        opacity: 0.9,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.75, // Adjusted logo duration for a slightly longer fade
        ease: "power2.out",
      })
      // Then: Wait 0.5 seconds and animate titles
      .to(
        titles,
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          stagger: {
            amount: 1,
            from: "random",
          },
          ease: "power2.out",
        },
        "+=0.5",
      ) // 0.5 second delay after logo finishes
      // Start ambient motion at the SAME TIME as title entrance (no additional delay)
      .add(() => {
        createAmbientMotion(true); // Pass true for immediate start
      }, "-=1"); // Start 1 second before the titles animation completes (at the beginning of title fade-in)

    return () => {
      gsap.killTweensOf([logoElement, titles]);
      // Clean up ambient timelines
      ambientTimelinesRef.current.forEach((tl) => tl.kill());
      ambientTimelinesRef.current = [];
    };
  }, []);

  // Improved cleanup function
  const cleanupMedia = (mediaElement: HTMLVideoElement | HTMLImageElement) => {
    if (!mediaElement) return;

    // Kill any animations on this element
    gsap.killTweensOf(mediaElement);

    // Remove from DOM
    if (mediaElement.parentNode) {
      mediaElement.parentNode.removeChild(mediaElement);
    }

    // Clean up video resources
    if (mediaElement instanceof HTMLVideoElement) {
      mediaElement.pause();
      mediaElement.removeAttribute("src");
      mediaElement.load(); // This properly releases video resources
    }
  };

  // Handle project hover with title fading
  const handleProjectHover = (
    projectId: number | null,
    hoveredElement: HTMLElement | null,
  ) => {
    if (!containerRef.current || !backgroundMediaRef.current) return;

    const allTitles = containerRef.current.querySelectorAll(".project-title");

    if (projectId !== null && hoveredElement) {
      // Entering hover state
      const project = limitedProjects.find((p) => p.id === projectId);
      if (!project) return;

      // Generate unique ID for this media request
      const mediaId = ++mediaIdRef.current;
      currentMediaIdRef.current = mediaId;

      // Kill all ambient animations
      ambientTimelinesRef.current.forEach((tl) => tl.kill());
      ambientTimelinesRef.current = [];
      gsap.killTweensOf(allTitles);

      // Kill any existing animations on the logo
      if (logoRef.current) {
        gsap.killTweensOf(logoRef.current);
      }

      // Fade out all other titles (keep their current positions)
      allTitles.forEach((title) => {
        if (title !== hoveredElement) {
          gsap.to(title, {
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.95,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });

      // Enhance the hovered element from its current position
      gsap.to(hoveredElement, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });

      // Fade out the KP logo
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: 0,
          filter: "blur(4px)",
          scale: 0.95,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // Clean up old media immediately
      if (currentMediaRef.current) {
        const oldMedia = currentMediaRef.current;
        gsap.to(oldMedia, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            cleanupMedia(oldMedia);
          },
        });
        currentMediaRef.current = null;
      }

      // Create new media element
      const isVideo =
        project.videoUrl.includes(".mp4") || project.videoUrl.includes(".webm");
      let newMedia: HTMLVideoElement | HTMLImageElement;

      if (isVideo) {
        newMedia = document.createElement("video");
        newMedia.src = project.videoUrl;
        newMedia.muted = true;
        newMedia.loop = true;
        newMedia.playsInline = true;
        newMedia.autoplay = true;
      } else {
        newMedia = document.createElement("img");
        newMedia.src = project.videoUrl;
      }

      newMedia.className = "absolute inset-0 w-full h-full object-cover";

      // Set initial state
      gsap.set(newMedia, {
        opacity: 0,
      });

      // Add to DOM
      backgroundMediaRef.current.appendChild(newMedia);
      currentMediaRef.current = newMedia;

      // Animate in when loaded - but only if this is still the current request
      const handleLoad = () => {
        // Check if this media is still relevant (no race condition)
        if (
          currentMediaIdRef.current === mediaId &&
          currentMediaRef.current === newMedia
        ) {
          gsap.to(newMedia, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          if (isVideo) {
            (newMedia as HTMLVideoElement).play().catch(console.log);
          }
        } else {
          // This media is no longer relevant, clean it up
          cleanupMedia(newMedia);
        }
      };

      if (isVideo) {
        newMedia.addEventListener("canplay", handleLoad, { once: true });
        // Add error handler
        newMedia.addEventListener(
          "error",
          () => {
            if (currentMediaIdRef.current === mediaId) {
              cleanupMedia(newMedia);
              if (currentMediaRef.current === newMedia) {
                currentMediaRef.current = null;
              }
            }
          },
          { once: true },
        );
      } else {
        newMedia.addEventListener("load", handleLoad, { once: true });
        newMedia.addEventListener(
          "error",
          () => {
            if (currentMediaIdRef.current === mediaId) {
              cleanupMedia(newMedia);
              if (currentMediaRef.current === newMedia) {
                currentMediaRef.current = null;
              }
            }
          },
          { once: true },
        );
      }

      // Fallback with race condition check
      setTimeout(() => {
        if (currentMediaIdRef.current === mediaId) {
          handleLoad();
        }
      }, 100);
    } else {
      // Leaving hover state
      currentMediaIdRef.current = null; // Cancel any pending media loads

      gsap.killTweensOf(allTitles);

      // Kill any existing animations on the logo
      if (logoRef.current) {
        gsap.killTweensOf(logoRef.current);
      }

      // Fade all titles back to normal and restart ambient motion
      allTitles.forEach((title) => {
        gsap.to(title, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Restart ambient motion after fade-in completes
            if (ambientTimelinesRef.current.length === 0) {
              createAmbientMotion();
            }
          },
        });
      });

      // Fade the KP logo back in
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: 0.9,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Fade out and clean up background media
      if (currentMediaRef.current) {
        const currentMedia = currentMediaRef.current;
        gsap.to(currentMedia, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            cleanupMedia(currentMedia);
          },
        });
        currentMediaRef.current = null;
      }
    }

    setHoveredProject(projectId);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentMediaRef.current) {
        cleanupMedia(currentMediaRef.current);
      }
      // Clean up ambient timelines
      ambientTimelinesRef.current.forEach((tl) => tl.kill());
      ambientTimelinesRef.current = [];
    };
  }, []);

  // Generate random positions for titles (keep desktop positions unchanged)
  const getRandomPosition = (index: number) => {
    const positions = [
      { top: "20%", left: "20%" },
      { top: "25%", right: "20%" },
      { top: "40%", left: "12%" },
      { bottom: "30%", right: "10%" },
      { bottom: "15%", left: "20%" },
      { top: "60%", right: "25%" },
    ];

    return positions[index];
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Project Background Media Container */}
      <div ref={backgroundMediaRef} className="fixed inset-0 z-0">
        {/* Dark overlay for better text readability when media is showing */}
        {hoveredProject !== null && (
          <div className="absolute inset-0 bg-black/30 z-10" />
        )}
      </div>

      {/* Project titles scattered around - now with responsive positioning */}
      {limitedProjects.map((project, index) => {
        const position = getRandomPosition(index);
        return (
          <Link
            key={project.id}
            href={`/work/${project.id.toString()}`}
            className="project-title absolute cursor-pointer select-none pointer-events-auto z-20"
            style={position}
            onMouseEnter={(e) =>
              handleProjectHover(project.id, e.currentTarget)
            }
            onMouseLeave={() => handleProjectHover(null, null)}
          >
            <span className="text-black/80 text-sm sm:text-lg md:text-2xl font-light tracking-wide hover:text-white transition-colors duration-300 leading-tight">
              {project.title}
            </span>
          </Link>
        );
      })}

      {/* Mobile-specific positioning adjustments using CSS */}
      <style jsx>{`
        @media (max-width: 767px) {
          .project-title:nth-child(2) {
            top: 15% !important;
            left: 10% !important;
          } /* Doritos Mortis */
          .project-title:nth-child(3) {
            top: 20% !important;
            right: 15% !important;
            left: auto !important;
          } /* Graywind Blinds */
          .project-title:nth-child(4) {
            top: 8% !important;
            left: 25% !important;
            right: auto !important;
            bottom: auto !important;
          } /* More - Jordan Webb */
          .project-title:nth-child(5) {
            bottom: 25% !important;
            left: 15% !important;
            right: auto !important;
            top: auto !important;
          } /* Nigaam Jewels */
          .project-title:nth-child(6) {
            bottom: 35% !important;
            right: 10% !important;
            left: auto !important;
            top: auto !important;
          } /* Pass Go */
          .project-title:nth-child(7) {
            bottom: 15% !important;
            right: 20% !important;
            left: auto !important;
            top: auto !important;
          } /* Damien's Gym */
        }
      `}</style>

      {/* Central logo/brand */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        <div className="text-center">
          <Link href="/work/14" className="pointer-events-auto">
            <div className="text-6xl md:text-8xl font-bold tracking-wider text-white opacity-90 mix-blend-difference">
              <Image
                src="/BLACKLOGO.png"
                alt="Home"
                width={200}
                height={80}
                className="h-auto w-32 sm:w-48 md:w-60"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
