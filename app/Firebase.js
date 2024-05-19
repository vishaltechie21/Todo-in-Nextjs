import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup, signOut as firebaseSignOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCyXYHig7hf40HahxgOLkNiH_Br287p2e8",
  authDomain: "todo-authentication-9dd96.firebaseapp.com",
  projectId: "todo-authentication-9dd96",
  storageBucket: "todo-authentication-9dd96.appspot.com",
  messagingSenderId: "1079919278648",
  appId: "1:1079919278648:web:02eff716a7820ff506c4cd",
  measurementId: "G-YE39KN224H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithPopup = () => {
  firebaseSignInWithPopup(auth, googleProvider)
    .then((result) => {
      const name = result.user.displayName;
      const photo = result.user.photoURL;
      const email = result.user.email;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("photo", photo);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      // Clear user information from local storage
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("photo");
    })
    .catch((error) => {
      console.log(error);
    });
};