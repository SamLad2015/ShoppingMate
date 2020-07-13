import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA0yFzTVGkg6fPWYkrSq7O9-ufJ32uj6cs",
    authDomain: "shoppingmate-cb438.firebaseapp.com",
    databaseURL: "https://shoppingmate-cb438.firebaseio.com",
    projectId: "shoppingmate-cb438",
    storageBucket: "shoppingmate-cb438.appspot.com",
    messagingSenderId: "645161230048",
    appId: "1:645161230048:web:d5497b1a199b14df23ba85",
    measurementId: "G-8P68S1BY1Y",
    persistence: true
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
