// import firebase from 'firebase/app';
// import 'firebase/database'; // Import other Firebase services you need

import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import { getDatabase, ref } from 'firebase/database';
const firebaseConfig = {
    apiKey: 'BPk9Epn2sJK2zdbk_jW-UOkqrW_9yZjLVymH_D6iWfAhY0bKTPZZkSSsPEMlBsMfsHdGmo94TkUdyaS-qwTnEiw ',
    // authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'cosmetics-shop-328c7',
    // storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: '77371275607',
    appId: 'YOUR_APP_ID',
};

// firebase.initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);


export { database, ref };