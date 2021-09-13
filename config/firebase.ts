import { initializeApp  } from 'firebase/app';
import { getFirestore  } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig  = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth();
auth.languageCode = 'cs';


//Sign up new users
// createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });

// Sign in existing users

// signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });

// Set an authentication state observer and get user data


export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();

// provider.setCustomParameters({ prompt: "select_account" });

// export type DocumentReference = firebase.firestore.DocumentReference;
// export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
// export type FieldValue = firebase.firestore.FieldValue;
// export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
// export type SnapshotOptions = firebase.firestore.SnapshotOptions;
// export type Timestamp = firebase.firestore.Timestamp;

