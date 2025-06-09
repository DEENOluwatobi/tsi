// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAOzoI-J3of6yvFKhMSYhVmAHY9ugrQsBg",
//   authDomain: "theskillupinit.firebaseapp.com",
//   projectId: "theskillupinit",
//   storageBucket: "theskillupinit.firebasestorage.app",
//   messagingSenderId: "302477638947",
//   appId: "1:302477638947:web:6a6e34f925bacaddcc6096",
//   measurementId: "G-23CS2ZR75C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOzoI-J3of6yvFKhMSYhVmAHY9ugrQsBg",
    authDomain: "theskillupinit.firebaseapp.com",
    projectId: "theskillupinit",
    storageBucket: "theskillupinit.firebasestorage.app",
    messagingSenderId: "302477638947",
    appId: "1:302477638947:web:6a6e34f925bacaddcc6096",
    measurementId: "G-23CS2ZR75C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);