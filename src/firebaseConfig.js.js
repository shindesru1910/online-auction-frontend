import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAFw6pgcRBU6c-5xkzII9eWO698y6uoyck",
  authDomain: "hello-world-31967.firebaseapp.com",
  projectId: "hello-world-31967",
  storageBucket: "hello-world-31967.appspot.com",
  messagingSenderId: "87930874524",
  appId: "1:87930874524:web:e989a23af0709c49631b59",
  measurementId: "G-ZYZCY06LD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);