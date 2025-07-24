// app/page.tsx
'use client';

export default function HomePage() {
  return (
    // REMOVE pointer-events-auto from this div.
    // Mouse events will now pass through to Iridescence in the empty space.
    // If you add interactive elements (buttons, links) later, apply pointer-events-auto to *them*.
    <div className="flex items-center justify-center min-h-screen text-white text-3xl"> 
      <p>home page</p>
    </div>
  );
}