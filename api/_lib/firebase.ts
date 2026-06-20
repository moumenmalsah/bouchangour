import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getServiceAccount() {
  const env = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (env) return JSON.parse(env);
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || 'bouchangour',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
}

const app = getApps().length === 0
  ? initializeApp({ credential: cert(getServiceAccount()) })
  : getApps()[0];

export const db = getFirestore(app);
