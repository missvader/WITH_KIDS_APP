// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ8_b6ZEcm-AVYES1oNSekJ08CZ4iVKQE",
  authDomain: "with-kids-app-a75f5.firebaseapp.com",
  projectId: "with-kids-app-a75f5",
  storageBucket: "with-kids-app-a75f5.appspot.com",
  messagingSenderId: "380026412153",
  appId: "1:380026412153:web:56f3f254801ee4c41b88a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};
