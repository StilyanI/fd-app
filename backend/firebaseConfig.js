import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlEWH6XwDwXQFzov0pRLTpL69bYLaHEF0",
  authDomain: "fd-app-e4fa6.firebaseapp.com",
  projectId: "fd-app-e4fa6",
  storageBucket: "fd-app-e4fa6.firebasestorage.app",
  messagingSenderId: "146555549284",
  appId: "1:146555549284:web:c609e791e36dc48ba05171",
  measurementId: "G-YK9ZYTJJQD"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);