"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { projectsData } from "../data/projects";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const backgroundMediaRef = useRef<HTMLDivElement>(null);
  const currentMediaRef = useRef<HTMLVideoElement | HTMLImageElement | null>(
    null,
  );
  const logoRef = useRef<HTMLDivElement>(null);

  // Add a unique ID system to track media elements
  const mediaIdRef = useRef<number>(0);
  const currentMediaIdRef = useRef<number | null>(null);

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

    return () => {
      gsap.killTweensOf(titles);
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
      const project = projectsData.find((p) => p.id === projectId);
      if (!project) return;

      // Generate unique ID for this media request
      const mediaId = ++mediaIdRef.current;
      currentMediaIdRef.current = mediaId;

      // Kill all ambient animations
      gsap.killTweensOf(allTitles);

      // Kill any existing animations on the logo
      if (logoRef.current) {
        gsap.killTweensOf(logoRef.current);
      }

      // Fade out all other titles
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

      // Keep hovered title sharp and visible
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
        project.gifUrl.includes(".mp4") || project.gifUrl.includes(".webm");
      let newMedia: HTMLVideoElement | HTMLImageElement;

      if (isVideo) {
        newMedia = document.createElement("video");
        newMedia.src = project.gifUrl;
        newMedia.muted = true;
        newMedia.loop = true;
        newMedia.playsInline = true;
        newMedia.autoplay = true;
      } else {
        newMedia = document.createElement("img");
        newMedia.src = project.gifUrl;
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

      // Fade all titles back to normal
      allTitles.forEach((title) => {
        gsap.to(title, {
          opacity: 1,
          filter: "blur(2px)",
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Restart ambient animation for this title
            gsap.to(title, {
              filter: "blur(2px)",
              duration: 1.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
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
      {/* Project Background Media Container */}
      <div ref={backgroundMediaRef} className="fixed inset-0 z-0">
        {/* Dark overlay for better text readability when media is showing */}
        {hoveredProject !== null && (
          <div className="absolute inset-0 bg-black/30 z-10" />
        )}
      </div>

      {/* Project titles scattered around */}
      {projectsData.map((project, index) => {
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
            <span className="text-black/80 text-lg md:text-2xl font-light tracking-wide hover:text-white transition-colors duration-300">
              {project.title}
            </span>
          </Link>
        );
      })}

      {/* Central logo/brand */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
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
