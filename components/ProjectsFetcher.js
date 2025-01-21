'use client'; // Client-side component

import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../app/api"; // Import fetchProjects from api.js

const ProjectsFetcher = () => {
  const [projects, setProjects] = useState([]); // State to hold the list of projects
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch and sort projects when the component is mounted
  useEffect(() => {
    const getProjects = async () => {
      setLoading(true); // Start loading
      try {
        const projectsData = await fetchProjects(); // Fetch projects from the API
        // Sort the projects by createdAt in descending order (newest first)
        const sortedProjects = projectsData.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setProjects(sortedProjects); // Update the state with sorted projects
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
      setLoading(false); // Stop loading
    };

    getProjects(); // Call the async function
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
        Featured Projects
      </h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-400">No projects available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsFetcher;
