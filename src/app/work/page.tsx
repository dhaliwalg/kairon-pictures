"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { projectsData } from "@/data/projects";
import ProjectCard from "@/app/components/ProjectCard";
import { StaggerContainer } from "../hooks/useStaggerAnimation";

// Define the available filter types
type ProjectTypeFilter =
  | "ALL"
  | "NARRATIVE"
  | "COMMERCIAL"
  | "MUSIC VIDEO"
  | "REEL";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectTypeFilter>("ALL");
  const [displayedProjects, setDisplayedProjects] = useState(() => 
    projectsData.filter(project => !project.hiddenFromWorkPage)
  );
  const [animationKey, setAnimationKey] = useState(0);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  
  // Ref to store the trigger function for project grid animation
  const triggerProjectAnimationRef = useRef<((delay?: number) => void) | null>(null);
  const isInitialLoad = useRef(true);

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Exclude projects where hiddenFromWorkPage is true
      if (project.hiddenFromWorkPage) {
        return false;
      }
      // Apply existing filter logic
      return activeFilter === "ALL" || project.type === activeFilter;
    });
  }, [activeFilter]);

  // Handle filter change with animation
  const handleFilterChange = (newFilter: ProjectTypeFilter) => {
    if (newFilter === activeFilter) return;
    
    setActiveFilter(newFilter);
  };

  // Update displayed projects when filteredProjects changes
  useEffect(() => {
    if (isInitialLoad.current) {
      // On initial load, just set the projects normally
      setDisplayedProjects(filteredProjects);
      isInitialLoad.current = false;
      // Mark that we've initially loaded to enable CSS override
      setTimeout(() => setHasInitiallyLoaded(true), 100);
    } else {
      // For filter changes, update projects and trigger animation
      setDisplayedProjects(filteredProjects);
      // Force re-render of StaggerContainer to trigger animation
      setAnimationKey(prev => prev + 1);
    }
  }, [filteredProjects]);

  // Handle animation ready callback to store the trigger function
  const handleProjectAnimationReady = (triggerFn: (delay?: number) => void) => {
    triggerProjectAnimationRef.current = triggerFn;
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white">
      {/* Container with proper overflow handling */}
      <div className="w-full max-w-[1920px] px-4 sm:px-6 md:px-16 lg:px-24 pt-24 sm:pt-32 pb-16 mx-auto overflow-x-hidden">
        {/* Filter Buttons Section with Stagger Animation */}
        <StaggerContainer
          className="flex flex-wrap justify-center mb-12 sm:mb-16 gap-2 sm:gap-4 md:gap-6 font-medium pointer-events-auto"
          options={{
            delay: 0.1,
            stagger: 0.1,
            duration: 0.6,
            from: "center",
            y: 30,
            selector: ".filter-pill",
            setInitialStyles: false, // CSS handles initial styles to prevent flash
          }}
        >
          {(
            [
              "ALL",
              "NARRATIVE",
              "COMMERCIAL",
              "MUSIC VIDEO",
            ] as ProjectTypeFilter[]
          ).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`filter-pill py-2 px-3 sm:px-4 md:px-6 rounded-full border border-white transition-colors duration-200 text-xs sm:text-sm md:text-lg lg:text-xl uppercase whitespace-nowrap
              ${
                activeFilter === filter
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {/* Shorter labels for mobile */}
              <span className="sm:hidden">
                {filter === "MUSIC VIDEO" ? "MUSIC" : filter}
              </span>
              <span className="hidden sm:inline">{filter}</span>
            </button>
          ))}
        </StaggerContainer>

        {/* Project Grid with Stagger Animation */}
        <StaggerContainer
          key={animationKey} // Force re-render when filter changes to reset animation
          className={`pointer-events-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center w-full ${
            hasInitiallyLoaded ? 'animated-container' : ''
          }`}
          options={{
            delay: isInitialLoad.current ? 0.6 : 0.1, // Shorter delay for filter changes
            stagger: 0.12,
            duration: 0.8,
            from: "start",
            y: 50,
            scale: 0.9,
            selector: ".project-card",
            setInitialStyles: !hasInitiallyLoaded, // Use CSS for initial load, JS for filter changes
          }}
          onAnimationReady={handleProjectAnimationReady}
        >
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card w-full max-w-sm sm:max-w-none ${
                hasInitiallyLoaded ? 'animated' : ''
              }`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </StaggerContainer>

        {/* Message if no projects found for filter */}
        {displayedProjects.length === 0 && (
          <StaggerContainer
            className="text-center text-gray-500 mt-12 text-base sm:text-lg pointer-events-auto"
            options={{
              delay: 0.3,
              selector: ".no-projects-message",
              setInitialStyles: false, // CSS handles initial styles
            }}
          >
            <p className="no-projects-message">
              No projects found for this category.
            </p>
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}