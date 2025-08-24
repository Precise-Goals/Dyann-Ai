import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // For Realtime DB
import { getFirestore } from "firebase/firestore"; // Optional Firestore
import { getAuth } from "firebase/auth"; // For Authentication

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL, // ✅ Added here
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
const db = getDatabase(app); // Realtime Database
const firestore = getFirestore(app); // Firestore (if needed)
const auth = getAuth(app); // Authentication

export { app, analytics, db, firestore, auth };
