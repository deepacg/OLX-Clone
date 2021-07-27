import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBlzn08bjZnmyuQK8xA9o7rr87FIRwRgXc",
    authDomain: "olx-clone-9d779.firebaseapp.com",
    projectId: "olx-clone-9d779",
    storageBucket: "olx-clone-9d779.appspot.com",
    messagingSenderId: "68960644942",
    appId: "1:68960644942:web:720b3925be1c3e85e5781f",
    measurementId: "G-K27N9SMF90"
  };

  export default firebase.initializeApp(firebaseConfig)