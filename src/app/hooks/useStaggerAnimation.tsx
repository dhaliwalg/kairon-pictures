"use client";
import { useEffect, useRef, useCallback } from "react";
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
  const elementsRef = useRef<Element[]>([]);

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

  // Memoized cleanup function
  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    // Kill any lingering tweens on the stored elements
    if (elementsRef.current.length > 0) {
      gsap.killTweensOf(elementsRef.current);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = Array.from(
      containerRef.current.querySelectorAll(selector),
    );
    if (elements.length === 0) return;

    // Store elements for cleanup
    elementsRef.current = elements;

    // Cleanup previous animation
    cleanup();

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

    return cleanup;
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
    cleanup,
  ]);

  // Method to trigger animation manually
  const triggerAnimation = useCallback(
    (customDelay = 0) => {
      if (!containerRef.current) return;

      const elements = Array.from(
        containerRef.current.querySelectorAll(selector),
      );
      if (elements.length === 0) return;

      // Store elements for cleanup
      elementsRef.current = elements;

      // Cleanup previous animation
      cleanup();

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
    },
    [
      cleanup,
      selector,
      opacity,
      y,
      scale,
      filter,
      duration,
      ease,
      stagger,
      from,
    ],
  );

  return { containerRef, triggerAnimation };
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  options?: StaggerAnimationOptions;
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
