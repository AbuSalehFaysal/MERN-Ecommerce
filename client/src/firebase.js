// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0joEZt6YHlZFtQSsYUIzwv6HSdFmKI74",
  authDomain: "mern-ecommerce-758fe.firebaseapp.com",
  projectId: "mern-ecommerce-758fe",
  storageBucket: "mern-ecommerce-758fe.appspot.com",
  messagingSenderId: "899057293675",
  appId: "1:899057293675:web:c3aa9fa9197ebd786b542e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
