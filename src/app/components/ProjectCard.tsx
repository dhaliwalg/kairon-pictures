"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // New state to control video playback visibility

  const projectDetailLink = `/work/${project.id.toString()}`;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      setIsVideoPlaying(true); // Indicate video should be visible and playing
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setIsVideoPlaying(false); // Indicate video should be hidden and paused
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
  };

  const handleImageLoadingComplete = () => {
    setThumbnailLoaded(true);
  };

  return (
    <Link
      href={projectDetailLink}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Loading Skeleton/Placeholder */}
      {!thumbnailLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse"></div>
      )}

      {/* 2. Next.js Image Component for the Thumbnail */}
      <Image
        src={project.thumbnailUrl}
        alt={`${project.title} thumbnail`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={handleImageLoadingComplete}
        // Image fades in once loaded, and fades out when video plays (on hover)
        className={`object-cover transition-opacity duration-300 ${
          thumbnailLoaded ? "opacity-100" : "opacity-0"
        } ${isVideoPlaying ? "opacity-0" : "opacity-100"}`}
      />

      {/* 3. Video Element */}
      <video
        ref={videoRef}
        src={project.videoUrl}
        title={project.title}
        loop
        muted
        playsInline
        // Video is initially hidden (opacity-0) and only appears when playing (on hover)
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isVideoPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Title and Type Overlay */}
      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-white">
          <h3 className="text-lg font-bold truncate">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;