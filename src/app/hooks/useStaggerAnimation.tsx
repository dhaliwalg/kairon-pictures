// src/app/hooks/useStaggerAnimation.ts
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface StaggerAnimationOptions {
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  from?: "start" | "center" | "end" | "edges" | "random";
  y?: number;
  opacity?: number;
  scale?: number;
  filter?: string;
  selector?: string;
}

export const useStaggerAnimation = (options: StaggerAnimationOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const {
    delay = 0.2,
    stagger = 0.08,
    duration = 0.8,
    ease = "power2.out",
    from = "start",
    y = 40,
    opacity = 0,
    scale = 0.95,
    filter = "blur(8px)",
    selector = ".stagger-item",
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Set initial state
    gsap.set(elements, {
      opacity,
      y,
      scale,
      filter,
    });

    // Create timeline
    timelineRef.current = gsap.timeline({ delay });

    // Animate in with stagger
    timelineRef.current.to(elements, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      ease,
      stagger: {
        amount: stagger * elements.length,
        from,
      },
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [
    delay,
    stagger,
    duration,
    ease,
    from,
    y,
    opacity,
    scale,
    filter,
    selector,
  ]);

  return containerRef;
};

// Alternative component-based approach
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  options?: StaggerAnimationOptions;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  options = {},
}) => {
  const containerRef = useStaggerAnimation(options);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
