"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SubtleTextAnimationProps {
  children: React.ReactNode;
  intensity?: "minimal" | "subtle" | "moderate";
  disabled?: boolean;
}

export default function SubtleTextAnimation({
  children,
  intensity = "subtle",
  disabled = false,
}: SubtleTextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimelinesRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    if (!containerRef.current || disabled) return;

    // Configuration based on intensity
    const config = {
      minimal: {
        translateRange: 2.2, // 2.2px movement
        rotationRange: 1.2, // 1.2 degrees
        scaleRange: 0.006, // 0.994-1.006
        duration: [3.5, 7], // 3.5-7 seconds
      },
      subtle: {
        translateRange: 3, // 3px movement
        rotationRange: 1.5, // 1.5 degrees
        scaleRange: 0.008, // 0.992-1.008
        duration: [3, 6], // 3-6 seconds
      },
      moderate: {
        translateRange: 4.5, // 4.5px movement
        rotationRange: 2.5, // 2.5 degrees
        scaleRange: 0.015, // 0.985-1.015
        duration: [2, 5], // 2-5 seconds
      },
    };

    const settings = config[intensity];

    // Find all text elements to animate
    const textElements = containerRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, a, button, .animate-text",
    );

    // Clear existing animations
    animationTimelinesRef.current.forEach((tl) => tl.kill());
    animationTimelinesRef.current = [];

    const createFloatingAnimation = (element: Element) => {
      const animateElement = () => {
        // Generate random values within range
        const targetX = (Math.random() - 0.5) * settings.translateRange * 2;
        const targetY = (Math.random() - 0.5) * settings.translateRange * 2;
        const targetRotation =
          (Math.random() - 0.5) * settings.rotationRange * 2;
        const targetScale = 1 + (Math.random() - 0.5) * settings.scaleRange * 2;

        // Random duration within range
        const duration =
          settings.duration[0] +
          Math.random() * (settings.duration[1] - settings.duration[0]);

        gsap.to(element, {
          x: targetX,
          y: targetY,
          rotation: targetRotation,
          scale: targetScale,
          duration: duration,
          ease: "sine.inOut",
          onComplete: () => {
            // Continue animation indefinitely
            animateElement();
          },
        });
      };

      // Start with random delay to avoid synchronization
      const startDelay = Math.random() * 2;
      gsap.delayedCall(startDelay, animateElement);

      // We still push a dummy timeline for consistency in cleanup, though not strictly needed here for individual tweens
      animationTimelinesRef.current.push(gsap.timeline());
    };

    // Apply animation to each text element
    textElements.forEach(createFloatingAnimation);

    // Cleanup function
    return () => {
      gsap.killTweensOf(textElements);
      animationTimelinesRef.current.forEach((tl) => tl.kill());
      animationTimelinesRef.current = [];
    };
  }, [intensity, disabled]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
