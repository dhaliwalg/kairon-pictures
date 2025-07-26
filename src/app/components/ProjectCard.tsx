"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert numeric ID to string for the URL path
  const projectDetailLink = `/work/${project.id.toString()}`;

  return (
    <Link
      href={projectDetailLink}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={isHovered ? project.gifUrl : project.thumbnailUrl}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-opacity duration-300"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/400x225/000000/FFFFFF?text=Error";
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-opacity duration-300 flex items-end p-4">
        <div className="text-white">
          <h3 className="text-lg font-bold truncate">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
