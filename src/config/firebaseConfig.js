// Import app from firebase
// because we need only app we dont need all of it
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD0k9esZsACHUUiIaEL_yHBjwwCzPVtqKI",
  authDomain: "netninja-react-redux-fir-84f98.firebaseapp.com",
  databaseURL: "https://netninja-react-redux-fir-84f98.firebaseio.com",
  projectId: "netninja-react-redux-fir-84f98",
  storageBucket: "netninja-react-redux-fir-84f98.appspot.com",
  messagingSenderId: "60463537235"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
