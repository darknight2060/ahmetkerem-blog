import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAqBR_gbVaBh4MmZcLgSVlCvKsXugjXUqY",
  authDomain: "ahmetkerem-blog.firebaseapp.com",
  projectId: "ahmetkerem-blog",
  storageBucket: "ahmetkerem-blog.appspot.com",
  messagingSenderId: "53437743708",
  appId: "1:53437743708:web:85f4fe50e4ffbe3bb55c99",
  measurementId: "G-WSGTG4JJEV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

export { firebase, auth, firestore, storage, database };