import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, addDoc, onSnapshot, serverTimestamp,
query, orderBy, deleteDoc, updateDoc, getDoc, where } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAJE22hkK2Degsi6PAzc7VUtwY320bvbT4",
    authDomain: "practice-24567.firebaseapp.com",
    projectId: "practice-24567",
    storageBucket: "practice-24567.appspot.com",
    messagingSenderId: "483451273723",
    appId: "1:483451273723:web:93dfe4c4bbab06030d4b5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export {
    auth,
    db,
    doc,
    setDoc,
    getDocs,
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    deleteDoc,
    updateDoc,
    getDoc,
    where
};