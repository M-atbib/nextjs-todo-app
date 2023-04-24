import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase.config";

const useFetchTodos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos(docSnap.data().todos);
        } else {
          setTodos({});
        }
      } catch (error) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, error, todos, setTodos };
};

export default useFetchTodos;
