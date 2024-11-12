import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDdvlBVAo4zDGjeA-fmXr7AheUseye93ok",
    authDomain: "diew-eb798.firebaseapp.com",
    projectId: "diew-eb798",
    storageBucket: "diew-eb798.appspot.com",
    messagingSenderId: "582982561023",
    appId: "1:582982561023:web:b4a9de512432be5487b0ca",
    measurementId: "G-EBJ95FC8MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database, firebaseConfig };
