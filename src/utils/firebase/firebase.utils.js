import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxlio0pljD9kK0hnFqvK3Bi_Dr2awuTKA",
  authDomain: "crwm-clothing-db-b9c0d.firebaseapp.com",
  projectId: "crwm-clothing-db-b9c0d",
  storageBucket: "crwm-clothing-db-b9c0d.appspot.com",
  messagingSenderId: "530262911196",
  appId: "1:530262911196:web:2fb8a22f3724c5a72e6c19",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  addtionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("userDocRef ", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapShot", userSnapshot);
  console.log("userSnapShot.exists", userSnapshot.exists);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...addtionalInformation,
      });
    } catch (error) {
      console.log("error creating the user.", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
