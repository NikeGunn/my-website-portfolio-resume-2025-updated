import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const ProjectCard = ({ project }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: project._id, // Unique id for each project
  });

  // Styles for smooth dragging and responsive z-index
  const cardStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)` // Use translate3d for GPU acceleration
      : 'none',
    transition: isDragging ? 'none' : 'transform 0.2s ease', // Disable transition while dragging for real-time movement
    zIndex: isDragging ? 100 : 1, // Bring the card to the top during dragging
    boxShadow: isDragging
      ? '0 10px 20px rgba(0, 0, 0, 0.3)' // Add a subtle shadow for visual feedback
      : '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      {...listeners}
      {...attributes}
      className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition text-center cursor-pointer"
    >
      <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-500 hover:underline"
      >
        Visit Project
      </a>
    </div>
  );
};

export default ProjectCard;
