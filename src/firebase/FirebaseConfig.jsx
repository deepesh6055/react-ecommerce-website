import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAbiGjk0Qlr-aoAgtqOWB_wkxJToojAoww",
  authDomain: "myecommerce-4c99d.firebaseapp.com",
  projectId: "myecommerce-4c99d",
  storageBucket: "myecommerce-4c99d.firebasestorage.app",
  messagingSenderId: "463164853817",
  appId: "1:463164853817:web:38706d97295298b01e47e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB , auth }