import React, { useState } from "react";
import Modal from "./Modal";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="sticky top-0 w-full left-0 flex items-center justify-between p-4 border-b border-solid border-white">
        <h1 className="text-3xl select-none sm:text-6xl">Todo List</h1>
        <i
          onClick={() => setOpenModal(true)}
          className="fa-solid fa-user text-xl duration-300 hover:opacity-40 sm:text-3xl"
        ></i>
      </div>
    </>
  );
};

export default Header;
