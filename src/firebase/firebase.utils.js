import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCl5d0upZ9bEFkTLc3YGqEo21ElpG2gCME",
  authDomain: "crwn-clothing-cf251.firebaseapp.com",
  databaseURL: "https://crwn-clothing-cf251.firebaseio.com",
  projectId: "crwn-clothing-cf251",
  storageBucket: "crwn-clothing-cf251.appspot.com",
  messagingSenderId: "992455927465",
  appId: "1:992455927465:web:533c74c4cd24f028222bb8",
  measurementId: "G-88B0XG86WE",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
