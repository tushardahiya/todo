import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQh4x1ZeirKdl5cFe4f1-yL_SGNwC-39A",
  authDomain: "todo-5d47c.firebaseapp.com",
  projectId: "todo-5d47c",
  storageBucket: "todo-5d47c.appspot.com",
  messagingSenderId: "460894995031",
  appId: "1:460894995031:web:80a9aa43a63bbab9f4d912",
  measurementId: "G-MZ2CKDRL0M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
