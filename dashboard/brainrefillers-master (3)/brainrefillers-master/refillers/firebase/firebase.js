import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';


const firebase = initializeApp({
    apiKey: "AIzaSyAu_WjURpqV_q6EPtRQtJrGyrfMqoT4HTs",
    authDomain: "brain-refillers.firebaseapp.com",
    projectId: "brain-refillers",
    storageBucket: "brain-refillers.appspot.com",
    messagingSenderId: "733600982317",
    appId: "1:733600982317:web:a32a68b3790e03f1431fa4"
})


const db = getFirestore(firebase);
const storage = getStorage(firebase);
const auth = getAuth(firebase);

export {db,auth,storage};