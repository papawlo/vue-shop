import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



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

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('profiles')
const productsCollection = db.collection('products')



firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

// export utils/refs
export {
    db,
    auth,
    productsCollection,
    usersCollection,
}

// export default firebase;