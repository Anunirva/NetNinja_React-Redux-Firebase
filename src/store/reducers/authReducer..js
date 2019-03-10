// Reducer is a function which will take intial state and action as an argument
// Based on action it will chnage the state and returns state;

const initialState = {
  authError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      console.log("Login Error");
      return {
        ...state,
        authError: "Login Failed"
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signout success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_SUCCESS":
      console.log("SignUp success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("Signup Error");
      return {
        ...state,
        authError: action.error.message
      };
    default:
      return state;
  }
};

export default authReducer;
