import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXvofUh7l75KMcK5r9q-s1mHby4wV9-gk",
  authDomain: "classroom-control-system.firebaseapp.com",
  projectId: "classroom-control-system",
  appId: "1:951012764910:web:ddb5de302d85d2e4fc57ff",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
