

import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyAzX7jJHgOksnvY24XAkseMJsco0J_rrxM",
    authDomain: "calendar-a10ef.firebaseapp.com",
    projectId: "calendar-a10ef",
    storageBucket: "calendar-a10ef.appspot.com",
    messagingSenderId: "493226695739",
    appId: "1:493226695739:web:3f9320ef2c44a9c302d01e"
};


const app = initializeApp(firebaseConfig);



const auth=getAuth(app);

const db=getFirestore();

export {auth,db}