// Reducer is a function which will take intial state and action as an argument
// Based on action it will chnage the state and returns state;

// Create some dummy data for the projects in intial state in future this will be replaces
const initialState = {
  projects: [
    { id: "1", title: "help me find peach", content: "blah blah blah" },
    { id: "2", title: "collect all the stars", content: "blah blah blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blah blah" }
  ]
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("project created", action.payload);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
