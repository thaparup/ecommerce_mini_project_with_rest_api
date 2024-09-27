import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMQ5jF9YdyJsmuuXo1vfIHs8BPT4HTKlo",
  authDomain: "eccom-e89f0.firebaseapp.com",
  projectId: "eccom-e89f0",
  storageBucket: "eccom-e89f0.appspot.com",
  messagingSenderId: "755231176432",
  appId: "1:755231176432:web:dc887f948e46ec6072b435",
  measurementId: "G-63E4B4E94K",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
