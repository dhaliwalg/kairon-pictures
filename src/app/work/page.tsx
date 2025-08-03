"use client";
import React, { useState } from "react";
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

  // Filter projects based on the activeFilter state AND hide projects marked as hiddenFromWorkPage
  const filteredProjects = projectsData.filter((project) => {
    // Exclude projects where hiddenFromWorkPage is true
    if (project.hiddenFromWorkPage) {
      return false;
    }
    // Apply existing filter logic
    return activeFilter === "ALL" || project.type === activeFilter;
  });

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
              onClick={() => setActiveFilter(filter)}
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
          className="pointer-events-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center w-full"
          options={{
            delay: 0.6, // Start after filter buttons finish
            stagger: 0.12,
            duration: 0.8,
            from: "start",
            y: 50,
            scale: 0.9,
            selector: ".project-card",
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card w-full max-w-sm sm:max-w-none"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </StaggerContainer>

        {/* Message if no projects found for filter */}
        {filteredProjects.length === 0 && (
          <StaggerContainer
            className="text-center text-gray-500 mt-12 text-base sm:text-lg pointer-events-auto"
            options={{
              delay: 0.3,
              selector: ".no-projects-message",
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
