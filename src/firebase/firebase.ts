import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWYT8q7ZQbC2mKXZ2haxcPqWJJXCozWgQ",
  authDomain: "foodapp-5779e.firebaseapp.com",
  databaseURL: "https://foodapp-5779e-default-rtdb.firebaseio.com",
  projectId: "foodapp-5779e",
  storageBucket: "foodapp-5779e.appspot.com",
  messagingSenderId: "9181753929",
  appId: "1:9181753929:web:1b144c804facf199db0598",
  measurementId: "G-P79KKM3DY4",
};

firebase.initializeApp(firebaseConfig)
// Initialize Firebase
//analytics is optional for this tutoral
const db = firebase.firestore();
const storage = firebase.storage();
// app.analytics();


export {  storage, db };
