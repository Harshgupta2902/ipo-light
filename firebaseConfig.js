
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Update this path

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = firebaseAdmin.firestore();
