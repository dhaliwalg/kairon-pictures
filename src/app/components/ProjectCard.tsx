// src/app/components/ProjectCard.tsx - Improved version

"use client";
import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current && !videoError) {
      setIsVideoPlaying(true);
      videoRef.current.play().catch((error) => {
        console.warn('Video play failed:', error);
        setVideoError(true);
      });
    }
  }, [videoError]);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleImageLoadingComplete = useCallback(() => {
    setThumbnailLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    console.warn('Video failed to load:', project.videoUrl);
    setVideoError(true);
  }, [project.videoUrl]);

  // Validate project data AFTER hooks
  if (!project || !project.id || !project.title) {
    console.warn('Invalid project data:', project);
    return null;
  }

  const projectDetailLink = `/work/${project.id.toString()}`;

  return (
    <Link
      href={projectDetailLink}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loading Skeleton */}
      {!thumbnailLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse"></div>
      )}

      {/* Thumbnail Image */}
      <Image
        src={project.thumbnailUrl}
        alt={`${project.title} thumbnail`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={handleImageLoadingComplete}
        onError={() => console.warn('Thumbnail failed to load:', project.thumbnailUrl)}
        className={`object-cover transition-opacity duration-300 ${
          thumbnailLoaded ? "opacity-100" : "opacity-0"
        } ${isVideoPlaying && !videoError ? "opacity-0" : "opacity-100"}`}
      />

      {/* Video Element - only render if we have a valid video URL and no error */}
{project.videoUrl && !videoError && (
  <video
    ref={videoRef}
    title={project.title}
    loop
    muted
    playsInline
    onError={handleVideoError}
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
      isVideoPlaying ? "opacity-100" : "opacity-0"
    }`}
  >
    {/* WebM first (smaller file size) */}
    <source 
      src={project.videoUrl.replace('.mp4', '.webm')} 
      type="video/webm" 
    />
    {/* MP4 fallback */}
    <source 
      src={project.videoUrl} 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>
)}

      {/* Title and Type Overlay */}
      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="text-white">
          <h3 className="text-lg font-bold truncate">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;