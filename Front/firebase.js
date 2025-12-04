// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYhvRR9K88DnibjqLYchS3kWxs_zwMueE",
  authDomain: "pdncineflix.firebaseapp.com",
  projectId: "pdncineflix",
  storageBucket: "pdncineflix.firebasestorage.app",
  messagingSenderId: "113985226867",
  appId: "1:113985226867:web:1f61850659cf73af4cc206",
  measurementId: "G-CRPZS0FMDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);