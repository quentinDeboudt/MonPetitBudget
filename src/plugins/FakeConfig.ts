import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import config from '@/meta/fakeDataConfig.json';

const firebaseConfig = {
  apiKey: config.VITE_FIREBASE_API_KEY,
  authDomain: config.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: config.VITE_FIREBASE_PROJECT_ID,
  storageBucket: config.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: config.VITE_FIREBASE_APP_ID,
  measurementId: config.VITE_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


// Authentification
const apps = getApps();
const firebaseApp = !apps.length ? initializeApp(firebaseConfig) : apps[0];
const firebaseAuth = getAuth(firebaseApp);

const getCurrentUser = () => new Promise((resolve, reject) => {
  const unsub = onAuthStateChanged(firebaseAuth, user => {
      unsub()
      resolve(user)
  }, reject)
})

export { firebaseApp, firebaseAuth, getCurrentUser }