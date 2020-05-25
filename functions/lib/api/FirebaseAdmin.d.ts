import * as admin from 'firebase-admin';
declare let firestore: FirebaseFirestore.Firestore;
declare const auth: import("firebase-admin/lib/auth").admin.auth.Auth;
export { admin, auth, firestore, };
