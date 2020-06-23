import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firebase-firestore";
/* Import the firebase SDK and extend with firestore */
require('firebase/firestore');


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBArKIrU8hrNfON5byYSanmTetYmRtk1ug",
    authDomain: "vue-shop-605cd.firebaseapp.com",
    databaseURL: "https://vue-shop-605cd.firebaseio.com",
    projectId: "vue-shop-605cd",
    storageBucket: "vue-shop-605cd.appspot.com",
    messagingSenderId: "980502291031",
    appId: "1:980502291031:web:42340dd2d60753840e3912"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

export default firebase;