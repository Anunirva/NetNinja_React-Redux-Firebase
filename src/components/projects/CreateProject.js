import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import action creators first
import { createProject } from "../../store/actions/createProject";

class CreateProject extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProjectHandler(this.state);
    this.props.history.push("/");
    // this.setState({
    //   title: "",
    //   content: ""
    // });
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} />
            <label htmlFor="title">Project Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
            <label htmlFor="content">Project Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

// things to know here
// craeteProjectHandler is sending to our comp in the props
// so that once the form is submitted we are calling this craeteProjectHandler
// and assigning that  form value to it
// then call the action creator from createproject action file
const mapDispatchToProps = dispatch => {
  return {
    createProjectHandler: project => dispatch(createProject(project))
  };
};

const mapStateToProps = rootReducer => {
  return {
    auth: rootReducer.firebase.auth
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);

// connect will always takes two parameters
// one is store data, other is any action creator
