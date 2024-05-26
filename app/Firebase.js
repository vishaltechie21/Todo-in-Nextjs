import { initializeApp } from "firebase/app";
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



// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Create Google auth provider instance
const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google Popup
export const signInWithPopup = () => {
  firebaseSignInWithPopup(auth, googleProvider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;

      // Store user information in local storage
      localStorage.setItem("name", displayName);
      localStorage.setItem("email", email);
      localStorage.setItem("photo", photoURL);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Function to sign out
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
