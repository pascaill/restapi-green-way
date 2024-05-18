import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { initializeApp as initializeClientApp } from 'firebase/app';
import { getAuth as getClientAuth } from 'firebase/auth';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json'assert { type: "json" };

// Initialize Firebase Admin
const adminApp = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://greenwayapi-a4ac1-default-rtdb.firebaseio.com"
});

const adminAuth = getAdminAuth(adminApp);
const db = getFirestore();

const firebaseConfig = {
  apiKey: "AIzaSyCkzmxgcXnvlGAFUmMDV7kq4YTGidOwTU0",
  authDomain: "greenwayapi-a4ac1.firebaseapp.com",
  databaseURL: "https://greenwayapi-a4ac1-default-rtdb.firebaseio.com",
  projectId: "greenwayapi-a4ac1",
  storageBucket: "greenwayapi-a4ac1.appspot.com",
  messagingSenderId: "541030198885",
  appId: "1:541030198885:web:80363ef901a0859ad8a08c",
  measurementId: "G-W4KTVX1TLM"
};


const clientApp = initializeClientApp(firebaseConfig);
const clientAuth = getClientAuth(clientApp);

export { adminAuth, db, clientAuth };
