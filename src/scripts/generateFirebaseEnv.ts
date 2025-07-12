// scripts/generateFirebaseEnv.ts
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const content = `self.FIREBASE_CONFIG = ${JSON.stringify(firebaseConfig, null, 2)};`;

fs.writeFileSync(path.join(process.cwd(), "public/firebase-env.js"), content);

console.log("✅ Firebase config written to public/firebase-env.js");
