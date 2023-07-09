// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "todo-f5c27.firebaseapp.com",
  databaseURL: "https://todo-f5c27-default-rtdb.firebaseio.com",
  projectId: "todo-f5c27",
  storageBucket: "todo-f5c27.appspot.com",
  messagingSenderId: "722373393740",
  appId: "1:722373393740:web:3c0e423c3a315a134b63e9",
  measurementId: "G-6F36RFKJGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
