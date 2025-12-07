import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCkmjLmRd3JDbfnUMgePG7repylSrzy8eI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "contesthub-60373.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "contesthub-60373",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "contesthub-60373.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "863980626754",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:863980626754:web:52c83b8cc3623540551edb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;

