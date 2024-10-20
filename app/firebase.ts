import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";
import { Firestore, getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;
let db: Firestore | undefined;

function initFirebase() {
  if (typeof window !== 'undefined' && !getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      console.log("Firebase app initialized");
      analytics = getAnalytics(app);
      console.log("Firebase analytics initialized");
      db = getFirestore(app);
      console.log("Firestore initialized");
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }
}

function getFirebaseComponents() {
  if (!app) initFirebase();
  return { 
    app, 
    db, 
    analytics, 
    logEvent: (analytics && firebaseLogEvent) || (() => {}), 
    doc: db ? doc : (() => {}), 
    setDoc: db ? setDoc : (() => Promise.resolve()) 
  };
}

export default getFirebaseComponents;