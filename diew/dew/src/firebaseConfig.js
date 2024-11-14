// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';

// การตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdvlBVAo4zDGjeA-fmXr7AheUseye93ok",
    authDomain: "diew-eb798.firebaseapp.com",
    projectId: "diew-eb798",
    storageBucket: "diew-eb798.appspot.com",
    messagingSenderId: "582982561023",
    appId: "1:582982561023:web:b4a9de512432be5487b0ca",
    measurementId: "G-EBJ95FC8MY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, onValue };
