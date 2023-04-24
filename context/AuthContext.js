import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUSer] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUSer(user);
      setLoading(false);
    });
  }, []);

  const value = { currentUser, signin, signup, logout, userInfo };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};
