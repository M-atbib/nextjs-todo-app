import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { signin, signup, currentUser } = useAuth();

  const submitHandler = async () => {
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        await signup(email, password);
      } catch (error) {
        setError("Incorrect password or email");
      }
      return;
    }
    await signin(email, password);
  };

  return (
    <div className="flex-1 sm:text-sm flex flex-col justify-center items-center gap-6 pt-16">
      <h1 className="font-extrabold select-none text-3xl sm:text-5xl pb-3">
        {!isLoggingIn ? "Login" : "Register"}
      </h1>
      {error && (
        <div className="w-full max-w-[40ch] border-rose-300 border text-center text-rose-400 py-2">
          {error}
        </div>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Adress"
        className="outline-none text-lg duration-300 border-b-[3px] border-solid border-white focus:border-cyan-300 text-slate-900 p-3 w-full max-w-[40ch]"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="outline-none text-lg duration-300 border-b-[3px] border-solid border-white focus:border-cyan-300 text-slate-900 p-3 w-full max-w-[40ch]"
      />
      <button
        onClick={submitHandler}
        className="w-full max-w-[40ch] border border-white border-solid uppercase font-semibold py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full after:duration-300 overflow-hidden hover:after:translate-x-full hover:text-slate-900"
      >
        <h2 className="relative z-20 text-lg">submit</h2>
      </button>

      <h2
        onClick={() => setIsLoggingIn(!isLoggingIn)}
        className="text-lg sm:text-xl cursor-pointer duration-300 hover:scale-110"
      >
        {!isLoggingIn ? "Login" : "Register"}{" "}
      </h2>
    </div>
  );
};

export default Login;
