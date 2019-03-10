import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Adding Redux to our application
// Install redux react-redux
// Import createStore from redux
// this createStore will take root reducer as an argument  and gives u the store
// Definetely we want to conatct with database at some point of time
// which is an async call
// To make async calls in redux we need to import some middlewares
// middlewares are store enhancers they just enhance our store
// here we are using redux thunk;

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

// Add firebase to our project
// import config file here
import firebase from "./config/firebaseConfig";

// Add two more imports to add firebase to redux
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

// Now add these two to our store enhancer so that redux knows how to use firebase
// we can add them by using compose from redux
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(firebase, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    }),
    reduxFirestore(firebase)
  )
);

// Now we need to wrap this store around our main Ap so that every component
// inside our app can get access to store

//attachAuthIsReady -> we make sure until the respose from firebase is ready
// we are not going to render our app in DOM
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
