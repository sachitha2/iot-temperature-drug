// export { db, auth,storage}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYZXfdE1FewJzudm755Wt8eneebCEq7tk",
  authDomain: "temperature-iot-d0608.firebaseapp.com",
  projectId: "temperature-iot-d0608",
  storageBucket: "temperature-iot-d0608.appspot.com",
  messagingSenderId: "484967496615",
  appId: "1:484967496615:web:53f3a614c10ad302951482",
  measurementId: "G-MY3SYZTBC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const AUTH = getAuth(app);
export const DB = getFirestore(app);
const analytics = getAnalytics(app);