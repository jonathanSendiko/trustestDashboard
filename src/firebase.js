import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2biQFTGazFk19iaUVtqbENHsJ6IIUuhM",
  authDomain: "trustest-db.firebaseapp.com",
  projectId: "trustest-db",
  storageBucket: "trustest-db.appspot.com",
  messagingSenderId: "954748544347",
  appId: "1:954748544347:web:0472282709fdc4724d267e",
  measurementId: "G-3YEVY0LD1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);