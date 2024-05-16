import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" }; // Path ke file JSON Service Account

// Inisialisasi aplikasi Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://greenwayapi-a4ac1-default-rtdb.firebaseio.com" // Sesuaikan dengan URL database Anda
});

// Inisialisasi Firestore
const db = getFirestore();

// Inisialisasi Auth
const auth = getAuth();

export { db, auth };
