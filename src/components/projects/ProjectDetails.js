import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom"; // this is used to redirect routes

import moment from "moment"; // use to tranform dates

// Single Project
// On click of individual project we wan to show details of that particular proj

const ProjectDetails = props => {
  const { project, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    return (
      <div>
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted by {project.authorFirstName} {project.authorLastName}
              </div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

// get that id from single project
// now find single project from all project
// for all projects we need firestoreconnect
// to map this project to compo as props we need mapstatetoprops
const mapStateToProps = (rootReducer, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = rootReducer.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: rootReducer.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "projects"
    }
  ])
)(ProjectDetails);
