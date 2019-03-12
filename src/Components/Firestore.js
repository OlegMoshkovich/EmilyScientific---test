import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC5_JKYjX_OtYqUNiK75OzCohS6m-oegig",
    authDomain: "freedomdreaming-52b83.firebaseapp.com",
    databaseURL: "https://freedomdreaming-52b83.firebaseio.com",
    projectId: "freedomdreaming-52b83",
    storageBucket: "",
    messagingSenderId: "166473984501"
  };

//   class Firestore {
//     constructor() {
//       firebase.initializeApp(config);
//     }
// }
const firestore = firebase.initializeApp(config);

export default firestore;
