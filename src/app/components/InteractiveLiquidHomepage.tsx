'use client';
import React, { useRef, useEffect } from 'react';

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Preload and optimize for smooth playback
      video.load();
      
      // Optional: Force loop restart for seamless experience
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-10">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-screen h-screen object-cover"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <source src="/new-splash.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;