// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASm7sZoIcAeC9ASMDIr8yRUfk7wmMdF0I",
  authDomain: "webify-b73d5.firebaseapp.com",
  projectId: "webify-b73d5",
  storageBucket: "webify-b73d5.appspot.com",
  messagingSenderId: "318380835054",
  appId: "1:318380835054:web:a65d27c5f0526459a4b3ff",
  measurementId: "G-YTP9LYQYS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}