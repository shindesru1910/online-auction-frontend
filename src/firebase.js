import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyB8lbhRta0w-5WpwsojxScQHGMBcAI_Ays",
    authDomain: "online-auction-ebe93.firebaseapp.com",
    projectId: "online-auction-ebe93",
    storageBucket: "online-auction-ebe93.appspot.com",
    messagingSenderId: "266549761084",
    appId: "1:266549761084:web:cd3102537e42d9e5b41f39",
    measurementId: "G-V36P28R4TZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
