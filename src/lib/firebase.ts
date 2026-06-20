import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjyNoyUHELJfpjQQ8QF-MiYa3X9sz1R0c",
  authDomain: "bouchangour.firebaseapp.com",
  projectId: "bouchangour",
  storageBucket: "bouchangour.firebasestorage.app",
  messagingSenderId: "604759407409",
  appId: "1:604759407409:web:891d6a74c3644b778a8e10",
  measurementId: "G-J608FD9PRK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
