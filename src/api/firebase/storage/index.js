import React, { createContext } from 'react';
import PropTypes from "prop-types";

import { storage, ref, uploadBytes, getDownloadURL } from '../config';

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const uploadImage = async (file) => {
    const storageRef = ref(storage, file.name);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const value = {
    uploadImage,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

StorageProvider.propTypes = {
  children: PropTypes.node.isRequired
};