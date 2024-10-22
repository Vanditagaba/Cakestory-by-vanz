import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqLvrgx-R6hQov9VlflWc45uYTILAcSk0",
  authDomain: "cakestory-by-vanz.firebaseapp.com",
  projectId: "cakestory-by-vanz",
  storageBucket: "cakestory-by-vanz.appspot.com",
  messagingSenderId: "162998284509",
  appId: "1:162998284509:web:88ff478290fb7be3f76b34",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
