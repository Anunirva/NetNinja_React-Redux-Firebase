import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NotFound = props => {
  const { auth } = props;
  if (auth.uid) {
    return (
      <div>
        <p>Sorry the page is closed..!!</p>
        <Link to="/">Login</Link>
      </div>
    );
  }
  return (
    <div>
      <p>Sorry the page is closed..!!</p>
      <Link to="/">SignIn</Link>
    </div>
  );
};
const mapStateToProps = rootReducer => {
  return {
    auth: rootReducer.firebase.auth
  };
};

export default connect(mapStateToProps)(NotFound);
