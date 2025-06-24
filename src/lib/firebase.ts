// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging, GetTokenOptions, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging with Web Push support check
let messaging: Messaging | null = null;

const setupMessaging = async (): Promise<Messaging | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log("Firebase messaging not available - not in browser environment or no service worker support");
    return null;
  }

  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
      console.log("Firebase messaging initialized successfully");
      return messaging;
    } else {
      console.log("Push messaging not supported on this device/browser.");
      return null;
    }
  } catch (error) {
    console.error("Error checking Firebase messaging support:", error);
    return null;
  }
};

// Initialize messaging immediately if possible
if (typeof window !== 'undefined') {
  setupMessaging();
}

export { messaging, getToken, onMessage, setupMessaging };
export type { Messaging, GetTokenOptions };