import React, { useContext, useEffect, useState } from "react";
import { app, auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore/lite";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(password) {
    return sendPasswordResetEmail(auth, password);
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  function deleteAccount() {
    return deleteUser(auth.currentUser);
  }

  function updateDocumentAddress(newAddress) {
    const userRef = doc(db, "users", currentUser.email);
    return updateDoc(userRef, {
      address: newAddress,
    });
  }

  function updateDocumentBirthday(newBirthday) {
    const userRef = doc(db, "users", currentUser.email);
    return updateDoc(userRef, {
      birthday: newBirthday,
    });
  }

  function updateDocumentFullName(newFullName) {
    const userRef = doc(db, "users", currentUser.email);
    return updateDoc(userRef, {
      fullname: newFullName,
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    deleteAccount,
    updateDocumentAddress,
    updateDocumentBirthday,
    updateDocumentFullName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
