'use client'; // Client-side component

import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../app/api"; // Import fetchProjects from api.js

const ProjectsFetcher = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      const projectsData = await fetchProjects(); // Call the function from api.js
      setProjects(projectsData); // Set the projects data
      setLoading(false);
    };

    getProjects();
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
