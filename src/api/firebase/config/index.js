import { initializeApp } from 'firebase/app';
import { initializeAuth, EmailAuthProvider, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore, arrayUnion, collection, doc, setDoc, updateDoc, getDoc, getDocs, query, where, orderBy, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebase.apiKey,
  authDomain: Constants.expoConfig.extra.firebase.authDomain,
  projectId: Constants.expoConfig.extra.firebase.projectId,
  storageBucket: Constants.expoConfig.extra.firebase.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.firebase.messagingSenderId,
  appId: Constants.expoConfig.extra.firebase.appId,
  measurementId: Constants.expoConfig.extra.firebase.measurementId
};

const fireApp = initializeApp(firebaseConfig);

// Inicializar autenticação com persistência
const auth = initializeAuth(fireApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializar outros serviços
const firestore = getFirestore(fireApp);
const storage = getStorage(fireApp);

// Exportar serviços e provedores
export { 
  auth, 
  firestore, 
  storage, 
  arrayUnion, 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  onSnapshot,
  addDoc,
  ref,
  uploadBytes,
  getDownloadURL
};
export const emailProvider = EmailAuthProvider;
export const googleProvider = GoogleAuthProvider;
export const facebookProvider = FacebookAuthProvider;
export const githubProvider = GithubAuthProvider;