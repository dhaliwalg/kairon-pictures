"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SubtleTextAnimationProps {
  children: React.ReactNode;
  intensity?: 'minimal' | 'subtle' | 'moderate';
  disabled?: boolean;
}

export default function SubtleTextAnimation({ 
  children, 
  intensity = 'subtle',
  disabled = false 
}: SubtleTextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline[]>([]);
  const isHoveredRef = useRef<boolean>(false);

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
      }
    };

    const settings = config[intensity];

    // Find all text elements to animate
    const textElements = containerRef.current.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, span, a, button, .animate-text'
    );

    // Clear existing animations
    animationRef.current.forEach(tl => tl.kill());
    animationRef.current = [];

    const createFloatingAnimation = (element: Element) => {
      const animateElement = () => {
        // Check if still should be animating (not hovered)
        if (isHoveredRef.current) return;

        // Generate random values within range
        const targetX = (Math.random() - 0.5) * settings.translateRange * 2;
        const targetY = (Math.random() - 0.5) * settings.translateRange * 2;
        const targetRotation = (Math.random() - 0.5) * settings.rotationRange * 2;
        const targetScale = 1 + (Math.random() - 0.5) * settings.scaleRange * 2;

        // Random duration within range
        const duration = settings.duration[0] + 
          Math.random() * (settings.duration[1] - settings.duration[0]);

        gsap.to(element, {
          x: targetX,
          y: targetY,
          rotation: targetRotation,
          scale: targetScale,
          duration: duration,
          ease: "sine.inOut",
          onComplete: () => {
            // Continue animation if still active and not hovered
            if (animationRef.current.length > 0 && !isHoveredRef.current) {
              animateElement();
            }
          },
        });
      };

      // Start with random delay to avoid synchronization
      const startDelay = Math.random() * 2;
      gsap.delayedCall(startDelay, animateElement);
      
      // Keep track for cleanup
      animationRef.current.push(gsap.timeline());
    };

    // Apply animation to each text element
    textElements.forEach(createFloatingAnimation);

    // Cleanup function
    return () => {
      gsap.killTweensOf(textElements);
      animationRef.current.forEach(tl => tl.kill());
      animationRef.current = [];
    };
  }, [intensity, disabled]);

  // Handle hover state changes
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    // Kill all current animations
    if (containerRef.current) {
      const textElements = containerRef.current.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, span, a, button, .animate-text'
      );
      gsap.killTweensOf(textElements);
      animationRef.current.forEach(tl => tl.kill());
      animationRef.current = [];
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    // Restart animations after a short delay
    setTimeout(() => {
      if (!isHoveredRef.current && containerRef.current) {
        const textElements = containerRef.current.querySelectorAll(
          'h1, h2, h3, h4, h5, h6, p, span, a, button, .animate-text'
        );
        
        // Get current settings
        const config = {
          minimal: {
            translateRange: 2.2,
            rotationRange: 1.2,
            scaleRange: 0.006,
            duration: [3.5, 7],
          },
          subtle: {
            translateRange: 3,
            rotationRange: 1.5,
            scaleRange: 0.008,
            duration: [3, 6],
          },
          moderate: {
            translateRange: 4.5,
            rotationRange: 2.5,
            scaleRange: 0.015,
            duration: [2, 5],
          }
        };
        
        const settings = config[intensity];
        
        // Restart animations
        textElements.forEach((element) => {
          const animateElement = () => {
            if (isHoveredRef.current) return;

            const targetX = (Math.random() - 0.5) * settings.translateRange * 2;
            const targetY = (Math.random() - 0.5) * settings.translateRange * 2;
            const targetRotation = (Math.random() - 0.5) * settings.rotationRange * 2;
            const targetScale = 1 + (Math.random() - 0.5) * settings.scaleRange * 2;
            const duration = settings.duration[0] + Math.random() * (settings.duration[1] - settings.duration[0]);

            gsap.to(element, {
              x: targetX,
              y: targetY,
              rotation: targetRotation,
              scale: targetScale,
              duration: duration,
              ease: "sine.inOut",
              onComplete: () => {
                if (animationRef.current.length > 0 && !isHoveredRef.current) {
                  animateElement();
                }
              },
            });
          };

          const startDelay = Math.random() * 2;
          gsap.delayedCall(startDelay, animateElement);
          animationRef.current.push(gsap.timeline());
        });
      }
    }, 100);
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}