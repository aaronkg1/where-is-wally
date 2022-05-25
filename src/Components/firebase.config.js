import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-sfTT-sNNm024KRL8Ba0IYRDz6zuA-uA",
  authDomain: "where-is-wally-e9ce2.firebaseapp.com",
  projectId: "where-is-wally-e9ce2",
  storageBucket: "where-is-wally-e9ce2.appspot.com",
  messagingSenderId: "635090263732",
  appId: "1:635090263732:web:c913445e23b09a1500c1e1",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
