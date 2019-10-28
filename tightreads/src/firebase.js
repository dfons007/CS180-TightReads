import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyBujikVsnQhbsXlMp_pc2ic4YCfUgq53gk",
  authDomain: "cs180tightreads.firebaseapp.com",
  databaseURL: "https://cs180tightreads.firebaseio.com",
  projectId: "cs180tightreads",
  storageBucket: "cs180tightreads.appspot.com",
  messagingSenderId: "576313699366",
  appId: "1:576313699366:web:80b86fac0a0faac9dfcae7",
  measurementId: "G-51RDJR38DZ"
};
firebase.initializeApp(firebaseConfig);
export default firebase;



