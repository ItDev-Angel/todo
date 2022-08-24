// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import {initializeApp} from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCgZkwjfeqJHclxFU2849BZ9R_wnO6y8GM",
  authDomain: "chat-c0160.firebaseapp.com",
  projectId: "chat-c0160",
  storageBucket: "chat-c0160.appspot.com",
  messagingSenderId: "215124673128",
  appId: "1:215124673128:web:ef92da23f3af36cd2f71dd",
  measurementId: "G-3JVGMGSMKM"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth()

export {app, db, auth }