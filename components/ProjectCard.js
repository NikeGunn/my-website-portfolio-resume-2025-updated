const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition text-center cursor-pointer">
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
