import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { auth, firestore, storage, arrayUnion, collection, doc, setDoc, updateDoc, getDoc, getDocs, query, where, orderBy, deleteDoc, onSnapshot, addDoc, ref, uploadBytes, getDownloadURL } from '../config';
import { updateProfile } from 'firebase/auth';
import { sendMessageToOpenAI } from '../../openai';
import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const {authUser, isAuth} = useContext(UserContext);
  const [app, setApp] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [talks, setTalks] = useState(null);
  const [whisps, setWhisps] = useState(null);

  useEffect(() => {
    if (isAuth) {
      const appDocRef = doc(firestore, 'app', 'info');
      const getApp = onSnapshot(appDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setApp(data);
        }
      });

      const userDocRef = doc(firestore, 'users', authUser?.uid);
      const getUser = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUser(data);
        } 
      });
       
      const chatsCollectionRef = collection(firestore, 'users', authUser?.uid, 'cluey');
      const chatsQuery = query(chatsCollectionRef, orderBy('updatedAt', 'desc'));
      const getChats = onSnapshot(chatsQuery, (querySnapshot) => {
          const data = querySnapshot.docs.map(docSnapshot => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          }));
          setChats(data);
      });

      const putUser = async () => {
        const timestamp = Date().toLocaleString();
        const name = authUser?.email.split("@")[0];
    
        const docRef = doc(firestore, 'users', authUser?.uid);
        return await setDoc(docRef, {
          uid: authUser?.uid,
          createdAt: timestamp,
          updatedAt: timestamp,
          profile: {
            displayName: authUser.displayName?authUser.displayName: name,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            photoURL: authUser.photoURL? authUser.photoURL: '',
          },
        }, { merge: true })
      };

      putUser();

      return () => {
        getApp();
        getUser();
        getChats();
      }
    }
  }, [authUser, isAuth]);

  const updateUserPhoto = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `public/${authUser?.uid}/photoURL.jpg`);
    const snapshot = await uploadBytes(storageRef, blob);

    const photoURL = await getDownloadURL(snapshot.ref);

    return await updateProfile(auth.currentUser, {
      photoURL: photoURL
    });
  };

  const putPreferences = async (focusItens, interestsItens) => {
    const timestamp = Date().toLocaleString();

    const docRef = doc(firestore, 'users', authUser?.uid);
    return await setDoc(docRef, {
      preferences: {
        focus: focusItens,
        interests: interestsItens,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const getContacts = async () => {
    if (user?.contacts?.length > 0) {
    const usersCollectionRef = collection(firestore, 'users');
    const q = query(usersCollectionRef, where('profile.email', 'in', user?.contacts));
    const querySnapshot = await getDocs(q);
  
    const contactsData = querySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return { ...data, id: docSnapshot.id };
    });
  
     setContacts(contactsData);
    }
  };

  const putContact = async (contact) => {
    const timestamp = Date().toLocaleString();

    const docRef = doc(firestore, 'users', authUser?.uid);
    return await updateDoc(docRef, {
      contacts: arrayUnion(contact),
      updatedAt: timestamp,
    })
  };

  const putCountry = async (iso, name) => {
    const timestamp = Date().toLocaleString();

    const docRef = doc(firestore, 'users', authUser?.uid);
    return await setDoc(docRef, {
      country: {
        iso: iso,
        name: name,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const createChat = async (text) => {
    const timestamp = Date().toLocaleString();
    const name = text.substring(0, 30);
    const chat = {
      name: name,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    const clueyCollectionRef = collection(firestore, 'users', authUser?.uid, 'cluey');
    return await addDoc(clueyCollectionRef, chat);
  };

  const createUserMessage = async (chatId, text) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    const chatDocRef = doc(firestore, 'users', authUser?.uid, 'cluey', chatId);
    await setDoc(chatDocRef, chat, { merge: true });
    await updateDoc(chatDocRef, {
      messages: arrayUnion(message),
    });
  };

  const createAiMessage = async (chatId, text) => {
    const response = await sendMessageToOpenAI(text);
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      name: 'Cluey',
      createdAt: timestamp,
      text: response,
    };
    const chatDocRef = doc(firestore, 'users', authUser?.uid, 'cluey', chatId);
    await setDoc(chatDocRef, chat, { merge: true });
    await updateDoc(chatDocRef, {
      messages: arrayUnion(message),
    });
  };

  const editChat = async (chatId, newName) => {
    const timestamp = Date().toLocaleString();
    const docRef = doc(firestore, 'users', authUser?.uid, 'cluey', chatId);
    return await updateDoc(docRef, {name: newName, updatedAt: timestamp});
  };

  const deleteChat = async (chatId) => {
    const docRef = doc(firestore, 'users', authUser?.uid, 'cluey', chatId);
    return await deleteDoc(docRef);
  };

  const getTalks = async () => {
    if (user?.contacts?.length > 0) {
      const talksCollectionRef = collection(firestore, 'talks');
      const talksQuery = query(talksCollectionRef, where('emailFriend', 'in', user?.contacts));
      const talksSnapshot = await getDocs(talksQuery);
    
      const talks = talksSnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return { ...data, id: docSnapshot.id };
      });

      const usersCollectionRef = collection(firestore, 'users');
      const usersQuery = query(usersCollectionRef, where('profile.email', 'in', user?.contacts));
      const usersSnapshot = await getDocs(usersQuery);
    
      const users = usersSnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return { ...data, id: docSnapshot.id };
      });

      const combinedData = talks.map((talk) => {
        const userData = users.find((user) => user.profile.email === talk.emailFriend);
        return { talk, userData };
      });

      setTalks(combinedData);
    }
  };

  const createTalk = async (email) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      emailUser: authUser?.email,
      emailFriend: email,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    const talksCollectionRef = collection(firestore, 'talks');
    const talksQuery = query(
      talksCollectionRef,
      where('emailFriend', '==', email),
      where('emailUser', '==', authUser?.email)
    );
    const talkSnapshot = await getDocs(talksQuery);
    
    if (talkSnapshot.empty) {
      const newTalkRef = await addDoc(talksCollectionRef, chat);
      return newTalkRef.id;
    } else {
      return talkSnapshot.docs[0].id;
    }
  };

  const getWhisps = async (id) => {
    try {
      const docRef = doc(firestore, 'talks', id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setWhisps(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUserWhisp = async (talkId, text) => {
    const timestamp = Date().toLocaleString();
    const talk = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    const talkDocRef = doc(firestore, 'talks', talkId);
    await setDoc(talkDocRef, talk, { merge: true });
    await updateDoc(talkDocRef, {
      messages: arrayUnion(message),
    });
  };
  

  const value = {
    app,
    user,
    contacts,
    chats,
    talks,
    whisps,
    updateUserPhoto,
    putPreferences,
    getContacts,
    putContact,
    putCountry,
    createChat,
    createUserMessage,
    createAiMessage,
    editChat,
    deleteChat,
    getTalks,
    createTalk,
    getWhisps,
    createUserWhisp,
  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};