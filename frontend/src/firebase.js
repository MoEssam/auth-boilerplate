import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYdy5UfQAf5MEyo7u_Mzz9d9NHbZcjjxw",
  authDomain: "authentication-system-c5dd4.firebaseapp.com",
  projectId: "authentication-system-c5dd4",
  storageBucket: "authentication-system-c5dd4.appspot.com",
  messagingSenderId: "744886501914",
  appId: "1:744886501914:web:1c3a2dd4702dc301a087a3",
  measurementId: "G-NFS16LZ79M",
};

try {
  firebase.initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fire = firebase;
export default fire;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAYdy5UfQAf5MEyo7u_Mzz9d9NHbZcjjxw",
//   authDomain: "authentication-system-c5dd4.firebaseapp.com",
//   projectId: "authentication-system-c5dd4",
//   storageBucket: "authentication-system-c5dd4.appspot.com",
//   messagingSenderId: "744886501914",
//   appId: "1:744886501914:web:1c3a2dd4702dc301a087a3",
//   measurementId: "G-NFS16LZ79M"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
