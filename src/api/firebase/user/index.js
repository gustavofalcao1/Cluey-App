import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

import { auth, emailProvider } from '../config';
import { LocaleContext } from '../../../components/locale';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {locale} = useContext(LocaleContext);
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user);
      user?setIsAuth(true):setIsAuth(false);
      user?.emailVerified?setIsVerify(true):setIsVerify(false);
    });

    return () => unsubscribe
  }, [auth]);

  

  const updateUserName = async (displayName) => {
    return await updateProfile(auth.currentUser, {
      displayName: displayName
    });
  };

  const updateUserEmail = async (password, newEmail) => {
    const credential = emailProvider.credential(
      authUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updateEmail(auth.currentUser, newEmail);
    await sendEmailVerification(auth.currentUser, {
      locale: locale.language.locale
    });
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const credential = emailProvider.credential(
      authUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
  };
  
  const value = {
    authUser,
    isAuth,
    isVerify,
    updateUserName,
    updateUserEmail,
    updateUserPassword
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};