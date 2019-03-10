import { combineReducers } from "redux";
import authReducer from "./authReducer.";
import projectReducer from "./projectReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

// Root Reducer will take all the reducers in our application and returns single reducer
// ie return state
// Now redux-firestore package we installed gives one readymade reducer called
// Firestore reducer and combie it along others
// Combine reducers is a function which will take reducre

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

// Now we can get any details from the store  using auth, project

export default rootReducer;
