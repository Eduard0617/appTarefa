import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBkxhDqmou98ngmmMR090-XXu1ErSwdb_Y",
  authDomain: "acessotarefas-3c92e.firebaseapp.com",
  projectId: "acessotarefas-3c92e",
  storageBucket: "acessotarefas-3c92e.firebasestorage.app",
  messagingSenderId: "678572653562",
  appId: "1:678572653562:web:792961ff72902982120243"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };