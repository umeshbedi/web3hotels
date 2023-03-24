import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAlMlJn0dSQ8kOH40aOH66CRC7E117YHb8",
    authDomain: "web3hotels-79bee.firebaseapp.com",
    projectId: "web3hotels-79bee",
    storageBucket: "web3hotels-79bee.appspot.com",
    messagingSenderId: "772090824633",
    appId: "1:772090824633:web:8da51139318b410c8ad868"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebaseApp.auth()
  const db = firebaseApp.firestore()
  const storage = firebaseApp.storage()
  
  export {auth, db, storage}