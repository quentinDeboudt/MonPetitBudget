import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAbSTGLO__ARQwZL9W3mtTowrU8563jS4",
  authDomain: "petit-budget-6c69d.firebaseapp.com",
  projectId: "petit-budget-6c69d",
  storageBucket: "petit-budget-6c69d.firebasestorage.app",
  messagingSenderId: "165602143381",
  appId: "1:165602143381:web:254f6f60281f1040813f9c",
  measurementId: "G-1RZ8DLDCDD"
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