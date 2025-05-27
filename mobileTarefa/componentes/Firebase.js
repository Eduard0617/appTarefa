import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkxhDqmou98ngmmMR090-XXu1ErSwdb_Y",
  authDomain: "acessotarefas-3c92e.firebaseapp.com",
  projectId: "acessotarefas-3c92e",
  storageBucket: "acessotarefas-3c92e.firebasestorage.app",
  messagingSenderId: "678572653562",
  appId: "1:678572653562:web:792961ff72902982120243"
};



const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
