"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <Link
      href={projectDetailLink}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.thumbnailUrl}
        title={project.title}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
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
