// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP5501X_YYFkGVEep2xmHuahp658zFAPI",
  authDomain: "notes-app-27bc0.firebaseapp.com",
  projectId: "notes-app-27bc0",
  storageBucket: "notes-app-27bc0.firebasestorage.app",
  messagingSenderId: "831082065393",
  appId: "1:831082065393:web:2f0f10aa608fb665f3a850"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);