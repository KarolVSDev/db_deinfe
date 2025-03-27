// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import env from "../service/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDAJCXV49KKG3-WZZpIhdgvUKAh_Ek74Es",
  authDomain: "deinfedb.firebaseapp.com",
  projectId: "deinfedb",
  storageBucket: "deinfedb.firebasestorage.app",
  messagingSenderId: "874843584553",
  appId: "1:874843584553:web:a51c3fb5cd3a6a04048438",
  measurementId: "G-DNRMCS6MD4"
}; 



// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const authBase = getAuth(firebase)
export const db = getFirestore()

