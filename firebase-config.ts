import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { env } from "process";

const firebaseConfig = {
  apiKey: import.meta.env.APIKEY,
  authDomain: import.meta.env.AUTHDOMAIN,
  projectId: import.meta.env.PROJECTID,
  storageBucket: "eccom-e89f0.appspot.com",
  messagingSenderId: "755231176432",
  appId: "1:755231176432:web:dc887f948e46ec6072b435",
  measurementId: "G-63E4B4E94K",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
