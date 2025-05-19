import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { apiRequiestWithCredentials } from "./ApiCall";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN ,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID ,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET ,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID ,
  appId: import.meta.env.VITE_FIREBASE_APPID ,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID, 
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const handleLoginWithGoogle =async()=>{
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

     
      await apiRequiestWithCredentials('post','/api/auth/google',{token: idToken})
      window.location.replace(`${import.meta.env.VITE_FRONTEND_URL}`);
    } catch (err) {
      console.error("Google login failed:", err);
    }
}

