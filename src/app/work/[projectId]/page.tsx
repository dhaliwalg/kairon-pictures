"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectsData, Project } from "@/data/projects";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = parseInt(params.projectId as string);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isNaN(projectId)) {
      const foundProject = projectsData.find((p) => p.id === projectId);
      setProject(foundProject || null);
      setLoading(false);
    } else {
      setProject(null);
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-black px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-lg">
          The project you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push("/work")}
          className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition-colors duration-200 pointer-events-auto" // Add pointer-events-auto here as well
        >
          Back to Work
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-black">
      <div className="pt-[64px] md:pt-[80px] lg:pt-[96px]"></div>

      {/* Vimeo Video Embed - Takes full width, has its own black background */}
      <div className="w-full bg-black aspect-video flex-shrink-0">
        {project.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}${
              project.vimeoHash ? `?h=${project.vimeoHash}&` : "?"
            }autoplay=0&loop=0&byline=0&portrait=0&title=0`}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen;"
            allowFullScreen
            className="w-full h-full object-cover pointer-events-auto" // ONLY ADD THIS LINE
            title={project.title}
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <p>Video not available for this project.</p>
          </div>
        )}
      </div>

      {/* Content Section (Title, Company, Crew) - Overlays the global InteractiveLiquidBackground */}
      <div className="flex-grow w-full px-4 md:px-8 lg:px-16 xl:px-20 py-12">
        {/* Project Title & Company */}
        <div className="mb-10 mt-0">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-none mb-1 tracking-tighter text-black">
            {project.title}
          </h2>
          {/* KAIRON PICTURES text */}
          <p className="text-sm md:text-base font-bold text-gray-700">
            KAIRON PICTURES
          </p>
        </div>

        {/* Crew Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-3 max-w-4xl w-full pb-16">
          {project.crew && project.crew.length > 0 ? (
            project.crew.map((member, index) => (
              <div key={index} className="flex items-baseline space-x-4">
                <p className="text-xs sm:text-sm font-bold uppercase text-gray-600 min-w-[120px]">
                  {member.role}
                </p>
                <p className="text-base sm:text-lg font-normal text-black">
                  {member.name}
                </p>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 text-center text-gray-700">
              No crew information available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
