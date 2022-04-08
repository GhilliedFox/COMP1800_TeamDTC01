//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC8FblTZ6cjxQctRXRyyzERGOvU7ZlfVtQ",
  authDomain: "waldo-teamdtc-01.firebaseapp.com",
  projectId: "waldo-teamdtc-01",
  storageBucket: "waldo-teamdtc-01.appspot.com",
  messagingSenderId: "1065805799116",
  appId: "1:1065805799116:web:873d31fb2213c37b24ec69",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
