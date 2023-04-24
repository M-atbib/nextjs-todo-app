import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

const Modal = (props) => {
  const { setOpenModal } = props;
  const [_document, set_document] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    set_document(document);
  }, []);

  if (!_document) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-white text-slate-900 flex flex-col">
      <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4 sm:p-6">
        <h1 className="font-extrabold text-3xl sm:text-6xl select-none ">
          Menu
        </h1>
        <i
          onClick={() => setOpenModal(false)}
          className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm:text-3xl"
        ></i>
      </div>
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h2
          onClick={() => {
            logout();
            setOpenModal(false);
          }}
          className="font-semibold text-lg sm:text-2xl select-none cursor-pointer duration-300 hover:pl-2"
        >
          Logout
        </h2>
      </div>
    </div>,
    _document.getElementById("portal")
  );
};

export default Modal;
