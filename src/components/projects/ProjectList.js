import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {projects &&
        projects.map(project => {
          return (
            <Link to={`/project/${project.id}`} key={project.id}>
              <ProjectSummary project={project} />
            </Link>
          );
        })}
    </div>
  );
};

export default ProjectList;

// Now we got projects array from dashboard
// we need to loop through projects and render those individual project;
// Get those projects and check
// by projects &&  -> this will amke sure that if projects exists then execute the
// next part to it
// ie using map property and pass individual project

// Ex for implementation
// {projects &&
//   projects.map(project => {
//     return <div key={project.id}>{project.title}</div>;
//   })}
