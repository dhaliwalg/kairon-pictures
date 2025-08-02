// app/template.tsx
"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (contentRef.current) {
      // Ensure the element is initially hidden (though the CSS class below is preferred)
      // and then animate it in.
      // GSAP's .fromTo() implicitly sets the 'from' state, but explicit CSS is safer for first render.
      gsap.fromTo(
        contentRef.current,
        // The 'from' state: ensures it starts hidden and slightly offset
        { opacity: 0, y: 20, scale: 0.98 },
        // The 'to' state: animates to visible, original position
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.1, // Small delay to let initial CSS render or GSAP initialize
        },
      );
    }
  }, [pathname]); // Re-run effect when pathname changes

  return (
    // Crucial: Add an initial opacity-0 and transition to this div
    // This makes sure it's hidden by CSS before JS (GSAP) takes over.
    // The `transition-opacity` ensures that if JS doesn't kick in immediately,
    // it won't just pop in, but will still smoothly appear.
    <div
      key={pathname} // Important for Next.js to re-mount and trigger effect
      ref={contentRef}
      className="w-full h-full relative opacity-0 transition-opacity duration-[700ms] ease-out"
      // The `opacity-0` hides it initially.
      // The `transition-opacity duration-[700ms] ease-out` is a fallback/graceful degradation.
      // GSAP will override this, but if JS is slow, it won't just pop in.
      // It also ensures that the element is *always* starting from opacity 0.
    >
      {children}
    </div>
  );
}
