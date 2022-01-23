import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYdy5UfQAf5MEyo7u_Mzz9d9NHbZcjjxw",
  authDomain: "authentication-system-c5dd4.firebaseapp.com",
  projectId: "authentication-system-c5dd4",
  storageBucket: "authentication-system-c5dd4.appspot.com",
  messagingSenderId: "744886501914",
  appId: "1:744886501914:web:1c3a2dd4702dc301a087a3",
  measurementId: "G-NFS16LZ79M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
