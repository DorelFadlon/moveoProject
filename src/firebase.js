import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDycWV3yXQYFkHfMLsuocWLMpnSQCNSE1I",
  authDomain: "moveoproject-966c2.firebaseapp.com",
  projectId: "moveoproject-966c2",
  storageBucket: "moveoproject-966c2.appspot.com",
  messagingSenderId: "619266484485",
  appId: "1:619266484485:web:bc15f49e7a2412dbfb6f6c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, app };
