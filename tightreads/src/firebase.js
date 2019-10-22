(function() {

  // Initialize firebase
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

  // Get elements
  const txt_email = document.getElementById('txt_email');
  const txt_password = document.getElementById('txt_password');
  const btn_login = document.getElementById('btn_login');
  const btn_signup = document.getElementById('btn_signup');
  const btn_logout = document.getElementById('btn_logout');

  // Add login event
  btn_login.addEventListener('click', e => {
    // Get email and password
    const email = txt_email.value;
    const password = txt_password.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  // Add signout event
  btn_logout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Add signup even
  btn_signup.addEventListener('click', e => {
    // Get email and password
    const email = txt_email.value;
    const password = txt_password.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  // Add a realtime listener
  firebase.auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      btn_logout.classList.remove('hide');
    }
    else {
      console.log('Not logged in');
      btn_logout.classList.add('hide');
    }
  });



}());


