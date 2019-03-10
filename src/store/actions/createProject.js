// First things first
// Action is an object which cintains type and optional paylod
// ex {type:EXAMPLE, payload: 'example'}
// Action creator is something which is called from components to make actions
// actions are the only one which modify the state
// Here we are using redux thunk as middleware because calling backend/database
// is an aysnc call which is it takes sometime to get data
// genereally actions are sync ones, which is why we need thunk here
// thunk returns an function instead of an obj
// this fn will have all the functionalities
// first this function will make call to backednm
// once the call is done then only it will dispatch action

// By adding firebase to our thunk and redux in index.js now we wil get access to firebase

export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    // this is fn we are talking about
    // make call to backend /**async operation */
    // then dispatch action, remember action is {} contains type and payload
    // First thing add project to firestore
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project, // author values will get from auth
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date() // timebeing hardcoding values,
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", payload: project });
      })
      .catch(error => {
        dispatch({ type: "CREATE_PROJECT_ERROR", payload: error });
      });
  };
};
