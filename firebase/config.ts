// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdVI5prCtijbUEzvfh2iBW1sH8sMv5Rvs",
  authDomain: "genesis-dd078.firebaseapp.com",
  projectId: "genesis-dd078",
  storageBucket: "genesis-dd078.appspot.com",
  messagingSenderId: "951614587437",
  appId: "1:951614587437:web:b18c3a44f0608a5703aea4",
  measurementId: "G-4YF8K1CB83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fbDB = getFirestore(app);
