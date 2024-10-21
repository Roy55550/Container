// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVBWxI5KKHjwnYbPXvE7eJv23sYrZtx40",
  authDomain: "container-cbfcf.firebaseapp.com",
  projectId: "container-cbfcf",
  storageBucket: "container-cbfcf.appspot.com",
  messagingSenderId: "1030641353066",
  appId: "1:1030641353066:web:ac82eea4d01036ebf8a513",
  measurementId: "G-FN2XV43QGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
