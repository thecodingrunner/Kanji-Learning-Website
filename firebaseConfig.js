// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC_1dZwzvDYu6qiK7AZ4x3cYtz4NlOFD_Y",
  authDomain: "kanji-app-6fc8c.firebaseapp.com",
  projectId: "kanji-app-6fc8c",
  storageBucket: "kanji-app-6fc8c.appspot.com",
  messagingSenderId: "952268947856",
  appId: "1:952268947856:web:3ed5d0a931f6b95e857315",
  measurementId: "G-J01BVXBCQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);