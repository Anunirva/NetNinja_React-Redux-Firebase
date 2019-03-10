import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";

import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom"; // this is used to redirect routes

class Dashboard extends Component {
  render() {
    // here we are getting projects in the form of props which is explained at bottom
    // Now pass those projects to project list compo

    // show this page only if user is logged in
    // we have user information in reducer so get and that and use
    // if user is not logged in and tryong to get this page we will redirect him to
    // signin page
    const { projectList, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projectList} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}
// Here we are getting the data in the form of props
// Because our index.js our App comp is wrapped inside a provider
// in rootReducer we have projecReducer assigned to project key
// we will access that and get into projectsReducer and from there we will accces projects
// which is in initial state

// Now in root reducer we have premade firestore reducer
const mapStateToProps = rootReducer => {
  // Our dashboard needs only projrcts, so we can listen to only that collection in firestore
  // In order to connect our dashboard to firestore we will use hoc like bottom
  // consolelog root reducer to see data in store
  //console.log("rootReducer:", rootReducer);
  return {
    projectList: rootReducer.firestore.ordered.projects,
    // the above key 'projectList' naming can be anything, always reside inside our component
    auth: rootReducer.firebase.auth,
    // now get notifications from collection
    notifications: rootReducer.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["createdAt", "desc"] }, // showing latest using date
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
// export default connect(mapStateToProps)(Dashboard);
// Now we have some data in the form of projects in projectReducer
// we want to access that array of projects
// But how do we do that
// First import connect which is a HOC (higher order component)
//which will take our component and gives itr some super powers
// In this case it will connect our componnt to store
// This connect will take one function which will map data from the store to our comp
