"use client";
import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import ProjectCard from "@/app/components/ProjectCard";
import SubtleTextAnimation from "../components/SubtleTextAnimation";

// Define the available filter types
type ProjectTypeFilter = "ALL" | "NARRATIVE" | "COMMERCIAL" | "MUSIC VIDEO" | "REEL"; // Added "REEL"

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
    <div className="min-h-screen flex flex-col items-center text-white px-0 py-0">
      <div className="w-full max-w-[1400px] px-8 md:px-16 lg:px-24 pt-32 pb-16 mx-auto">
        {/* Filter Buttons Section - Now with boxed/pill style */}
        <SubtleTextAnimation intensity="subtle">
          <div className="flex justify-center mb-16 space-x-4 md:space-x-6 font-medium text-lg md:text-xl uppercase pointer-events-auto">
            {" "}
            {/* ADDED pointer-events-auto HERE */}
            {(
              [
                "ALL",
                "NARRATIVE",
                "COMMERCIAL",
                "MUSIC VIDEO",
              ] as ProjectTypeFilter[] // Keep filter options as they were (excluding REEL)
            ).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`py-2 px-6 rounded-full border border-white transition-colors duration-200
                  ${
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </SubtleTextAnimation>

        {/* Project Grid - Wrapped with minimal animation */}

        <div className="pointer-events-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {" "}
          {filteredProjects.map((project) => (
            // Ensure ProjectCard's internal Link or wrapping div has pointer-events-auto
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Message if no projects found for filter */}
        {filteredProjects.length === 0 && (
          <SubtleTextAnimation intensity="subtle">
            <p className="text-center text-gray-500 mt-12 text-lg pointer-events-auto">
              {" "}
              {/* ADDED pointer-events-auto HERE if this text should be selectable/interactable */}
              No projects found for this category.
            </p>
          </SubtleTextAnimation>
        )}
      </div>
    </div>
  );
}