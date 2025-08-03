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
  setInitialStyles?: boolean;
}

export const useStaggerAnimation = (options: StaggerAnimationOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

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
    setInitialStyles = true,
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Only set initial styles on first load if setInitialStyles is true
    if (setInitialStyles && !hasAnimatedRef.current) {
      gsap.set(elements, {
        opacity,
        y,
        scale,
        filter,
      });
    }

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
      onComplete: () => {
        hasAnimatedRef.current = true;
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
    setInitialStyles,
  ]);

  // Method to trigger animation manually (useful for filter changes)
  const triggerAnimation = (customDelay = 0) => {
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

    // Create timeline with custom delay
    timelineRef.current = gsap.timeline({ delay: customDelay });

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
  };

  return { containerRef, triggerAnimation };
};

// Updated component-based approach
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  options?: StaggerAnimationOptions;
  // New prop to get access to trigger function
  onAnimationReady?: (triggerAnimation: (delay?: number) => void) => void;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  options = {},
  onAnimationReady,
}) => {
  const { containerRef, triggerAnimation } = useStaggerAnimation(options);

  useEffect(() => {
    if (onAnimationReady) {
      onAnimationReady(triggerAnimation);
    }
  }, [onAnimationReady, triggerAnimation]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
