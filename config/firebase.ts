import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCu-P4GVisynuOC3F0f7cVspkHBD5_Ciqo",
  authDomain: "ponto-aluno.firebaseapp.com",
  projectId: "ponto-aluno",
  storageBucket: "ponto-aluno.appspot.com",
  messagingSenderId: "563904884416",
  appId: "1:563904884416:web:1d635a1159be65cd180725"
};

// Inicializa o Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = !getApps().length ? initializeAuth(app, {
  persistence: inMemoryPersistence
}) : getAuth(app);

const firestore = getFirestore(app);

export { auth, firestore };