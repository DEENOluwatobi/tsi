import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOzoI-J3of6yvFKhMSYhVmAHY9ugrQsBg",
    authDomain: "theskillupinit.firebaseapp.com",
    projectId: "theskillupinit",
    storageBucket: "theskillupinit.firebasestorage.app",
    messagingSenderId: "302477638947",
    appId: "1:302477638947:web:6a6e34f925bacaddcc6096",
    measurementId: "G-23CS2ZR75C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);