import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "@/firebase.config";
import TodoCard from "./TodoCard";
import useFetchTodos from "@/hooks/fetchTodos";

const UserDashboard = () => {
  const { userInfo, currentUser } = useAuth();
  const [edit, setEdit] = useState(null);
  const [todo, setTodo] = useState("");
  const [edittedValue, setEdittedValue] = useState("");

  const { todos, loading, error, setTodos } = useFetchTodos();

  /*useEffect(() => {
    if (!userInfo || Object.keys(userInfo).length === 0) {
      setAddTodo(true);
    }
  }, []);*/

  const handlerAddTodo = async () => {
    if (!todo) {
      return;
    }
    const newKey =
      Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1;
    setTodos({
      ...todos,
      [newKey]: todo,
    });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: todo,
        },
      },
      { merge: true }
    );
    setTodo("");
  };

  const handleAddEdit = (todoKey) => {
    return () => {
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  };

  const handleSubmitEdit = async () => {
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setTodos({
      ...todos,
      [newKey]: edittedValue,
    });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );

    setEdit(null);
    setEdittedValue("");
  };

  const handleDelete = (todoKey) => {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];
      setTodos(tempObj);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  };

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col gap-4 sm:gap-5">
      <div className="flex items-stretch mb-6">
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="flex-1 outline-none p-3 sm:p-4 text-base sm:text-xl text-slate-900"
        />
        <button
          onClick={handlerAddTodo}
          className="w-fit px-4 sm:px-6 py-3 sm:py-4 bg-amber-400 text-white font-medium text-base sm:text-xl duration-300 hover:bg-transparent hover:border hover:border-amber-400 hover:text-amber-400 hover:font-semibold"
        >
          ADD
        </button>
      </div>
      {loading && (
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-spinner animate-spin text-3xl sm:text-4xl"></i>
        </div>
      )}
      {!loading && (
        <>
          {Object.keys(todos).map((todo, index) => (
            <TodoCard
              key={index}
              handleAddEdit={handleAddEdit}
              edit={edit}
              todoKey={todo}
              edittedValue={edittedValue}
              setEdittedValue={setEdittedValue}
              handleSubmitEdit={handleSubmitEdit}
              handleDelete={handleDelete}
            >
              {todos[todo]}
            </TodoCard>
          ))}
        </>
      )}
      {/*!addTodo && (
        <button
          onClick={() => setAddTodo(true)}
          className="text-cyan-300 border border-cyan-300 py-2 sm:py-3 text-center uppercase font-meduim text-lg sm:text-2xl duration-300 hover:bg-cyan-300 hover:text-slate-900 hover:font-semibold"
        >
          ADD TODO
        </button>
      )*/}
    </div>
  );
};

export default UserDashboard;
