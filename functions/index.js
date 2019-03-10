const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// this will give us access to firebase & firestore

// This function will be called if client request it with http
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Now we will create a function to notify us whenevr a new project is added
// This function will be triggered whenver there is chnage in projects collection
// so get the doc from projects collection

// will create one common function to listen whenver project si created or user is signed
// we are creating one collection of notifications whenver this function is called from
// proj created or user signed in

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("notification added", doc));
};

exports.createProject = functions.firestore
  .document("projects/{projectId}")
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: "Added a new project",
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

// This will firedup whenever user is created
exports.userJoined = functions.auth.user().onCreate(user => {
  // here we are getting the details of created user from users collection
  // and adding the details to our notification collection
  // Now in our componets we can listen to the notification collection and display data
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid) // get that user using user.id
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: "Joined the party",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    });
});
