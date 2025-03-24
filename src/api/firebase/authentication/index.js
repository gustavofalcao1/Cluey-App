import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from "prop-types";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isNew, setIsNew] = useState(true);
  const notNew = async () => {AsyncStorage.setItem('isNewUser', 'false')};

  useEffect(() => {
    const unsubscribe = AsyncStorage.getItem('isNewUser').then((value) => {
      if (value === 'false') {
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    });

    return () =>  unsubscribe
  }, []);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      notNew();
    });
  };

  const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      notNew();
    });
  };

  const emailVerify = async () => {
    return await sendEmailVerification(auth.currentUser);
  };

  const forgot = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const userSignOut = async () => {
    return signOut(auth);
  };

  // Implementação dos métodos de login social
  // Nota: Estes métodos estão implementados como placeholders
  // Para implementação completa, será necessário usar bibliotecas específicas para autenticação social no React Native
  // como expo-auth-session ou react-native-app-auth
  const signGoogle = async () => {
    // Implementação real requer configuração específica para React Native
    console.log('Google login não implementado completamente');
    // Placeholder para desenvolvimento
    notNew();
    return { user: { uid: 'google-user-id', email: 'google@example.com' } };
  };

  const signFacebook = async () => {
    // Implementação real requer configuração específica para React Native
    console.log('Facebook login não implementado completamente');
    // Placeholder para desenvolvimento
    notNew();
    return { user: { uid: 'facebook-user-id', email: 'facebook@example.com' } };
  };

  const signGithub = async () => {
    // Implementação real requer configuração específica para React Native
    console.log('Github login não implementado completamente');
    // Placeholder para desenvolvimento
    notNew();
    return { user: { uid: 'github-user-id', email: 'github@example.com' } };
  };

  const value = {
    isNew,
    signIn,
    signUp,
    emailVerify,
    forgot,
    signOut: userSignOut,
    signGoogle,
    signFacebook,
    signGithub
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};