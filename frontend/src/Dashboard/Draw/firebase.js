// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ7Xn_jNK8q3QwF41-0uAIWSqzP2pKRJU",
  authDomain: "webrtc-241e4.firebaseapp.com",
  projectId: "webrtc-241e4",
  storageBucket: "webrtc-241e4.appspot.com",
  messagingSenderId: "406704494556",
  appId: "1:406704494556:web:6c2da05153c9ae6b246119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);