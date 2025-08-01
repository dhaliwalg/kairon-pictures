"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const projectDetailLink = `/work/${project.id.toString()}`;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
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
      {!thumbnailLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse"></div>
      )}

      {/* Next.js Image component for the thumbnail */}
      <Image
        src={project.thumbnailUrl}
        alt={`${project.title} thumbnail`}
        fill // Use fill to make it cover the parent Link
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize for different screen sizes
        onLoadingComplete={handleImageLoadingComplete}
        className={`object-cover ${
          thumbnailLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />

      {/* Video element - it should only play, the image handles the initial visual */}
      <video
        ref={videoRef}
        src={project.videoUrl}
        title={project.title}
        loop
        muted
        playsInline

        className={`absolute inset-0 w-full h-full object-cover ${
          thumbnailLoaded ? "opacity-100" : "opacity-0" // Hide video until thumbnail is loaded
        }`}
      />

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