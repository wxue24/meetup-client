import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { firebaseConfig } from "./firebaseConfig";

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
// db.settings({
//   host: "192.168.68.109:8080",
//   ssl: false,
// });
const timeStamp = firebase.firestore.Timestamp;

const auth = app.auth();

const functions = app.functions();

export { db, auth, functions, timeStamp };

//firebase emulators:start
