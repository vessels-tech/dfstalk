// const admin = require('firebase-admin');
import * as admin from 'firebase-admin';

let firestore: FirebaseFirestore.Firestore;

if (admin.apps.length === 0) {
  admin.initializeApp();
  firestore = admin.firestore();
  // const settings = { timestampsInSnapshots: true };
  const settings = {};
  // console.log("FirebaseAdmin calling firestore.settings");
  firestore.settings(settings);
}

const auth = admin.auth();
//@ts-ignore
if (!firestore) {
  firestore = admin.firestore();
}

export {
  admin,
  auth,
  firestore,
}