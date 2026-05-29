import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnWYoGMyNfIbUiDwf1ragYCVgx0rL1lKw",
  authDomain: "my-shopper-2026.firebaseapp.com",
  projectId: "my-shopper-2026",
  storageBucket: "my-shopper-2026.firebasestorage.app",
  messagingSenderId: "659838872764",
  appId: "1:659838872764:web:d9a9c5ba94e6babbd8b4b9",
  measurementId: "G-X41F1ENBZY"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
