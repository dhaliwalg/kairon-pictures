// app/work/page.tsx
'use client'; // This page needs client-side state for filtering

import React, { useState } from 'react';
import { projectsData } from '@/data/projects'; // Import data and type
import ProjectCard from '@/app/components/ProjectCard'; // Import the ProjectCard component

// Define the available filter types
type ProjectTypeFilter = 'ALL' | 'NARRATIVE' | 'COMMERCIAL' | 'MUSIC VIDEO';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectTypeFilter>('ALL');

  // Filter projects based on the activeFilter state
  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter(project => project.type === activeFilter);

  return (
    <div className="min-h-screen flex flex-col items-center text-white px-0 py-0">
      {/* Main content wrapper - centered and with specific max-width and internal padding */}
      {/* pt-32 to push content down from global header */}
      <div className="w-full max-w-[1400px] px-8 md:px-16 lg:px-24 pt-32 pb-16 mx-auto">

        {/* Filter Buttons Section - Now with boxed/pill style */}
        <div className="flex justify-center mb-16 space-x-4 md:space-x-6 font-medium text-lg md:text-xl uppercase"> {/* Adjusted spacing and font */}
          {(['ALL', 'NARRATIVE', 'COMMERCIAL', 'MUSIC VIDEO'] as ProjectTypeFilter[]).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-2 px-6 rounded-full border border-white transition-colors duration-200
                ${activeFilter === filter
                  ? 'bg-white text-black' // Active state: white background, black text
                  : 'bg-black text-white hover:bg-gray-800' // Inactive state: black background, white text, hover effect
                }`
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center"> {/* Changed xl:grid-cols-4 to xl:grid-cols-3 to match PPT */}
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Message if no projects found for filter */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">No projects found for this category.</p>
        )}
      </div>
    </div>
  );
}