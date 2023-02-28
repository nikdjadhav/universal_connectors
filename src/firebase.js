// *** google login using firebase
import { initializeApp } from 'firebase/app'; 

const firebaseConfig = {
    apiKey: "AIzaSyArRj7_HkCCTVEaPvPkN2XC-WlLn2NBhEE",
    authDomain: "login-project-4b8a9.firebaseapp.com",
    projectId: "login-project-4b8a9",
    storageBucket: "login-project-4b8a9.appspot.com",
    messagingSenderId: "746070047174",
    appId: "1:746070047174:web:5e8188f4f8ac92e8b75ac7",
  };

  export const app = initializeApp(firebaseConfig);