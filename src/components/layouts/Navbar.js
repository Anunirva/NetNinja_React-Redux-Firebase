import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks.js";
import SignedOutLinks from "./SignedOutLinks.js";
import { connect } from "react-redux";

const Navbar = props => {
  const { authStatus } = props;
  // Conditionally show links here based on auth
  // Whether user is present or not
  const links = authStatus.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          MarioPlan
        </Link>
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = rootReducer => {
  //console.log("rootReducer:", rootReducer);
  return {
    authStatus: rootReducer.firebase.auth
  };
};
export default connect(mapStateToProps)(Navbar);
