// app/components/ProjectCard.tsx
'use client'; // This component needs client-side state and event handlers

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects'; // Import the Project type

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // We'll link to a placeholder project detail page for now
  // You would typically have a dynamic route like /work/[id]
  const projectDetailLink = `/work/${project.id}`;

  return (
    <Link
      href={projectDetailLink}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail or GIF based on hover state */}
      <img
        src={isHovered ? project.gifUrl : project.thumbnailUrl}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x225/000000/FFFFFF?text=Error'; }} // Fallback
      />

      {/* Overlay for title and type - appears on hover, slightly darker */}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-opacity duration-300 flex items-end p-4">
        <div className="text-white">
          <h3 className="text-lg font-bold truncate">{project.title}</h3> {/* Truncate long titles */}
          <p className="text-sm text-gray-300">{project.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;