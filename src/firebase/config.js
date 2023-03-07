import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALOLWutxmLIRgQtto7aQw6Sen0hazdLPc",
  authDomain: "cooking-recipe-84b7d.firebaseapp.com",
  projectId: "cooking-recipe-84b7d",
  storageBucket: "cooking-recipe-84b7d.appspot.com",
  messagingSenderId: "172623245380",
  appId: "1:172623245380:web:c4f8774c2cf5687e094c11",
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Init Services
const projectFirestore = firebase.firestore();

export { projectFirestore };
