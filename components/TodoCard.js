import React from "react";

const TodoCard = (props) => {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleSubmitEdit,
    handleDelete,
  } = props;

  return (
    <div className="p-2 border flex items-stretch border-white ">
      <div className="flex-1 flex text-base sm:text-lg">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            type="text"
            className="bg-inherit flex-1 text-white outline-none"
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
      </div>
      <div className="flex items-center text-base">
        {edit === todoKey ? (
          <i
            onClick={handleSubmitEdit}
            className="fa-solid fa-check px-2 cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={handleAddEdit(todoKey)}
            className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
          ></i>
        )}
        <i
          onClick={handleDelete(todoKey)}
          className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
        ></i>
      </div>
    </div>
  );
};

export default TodoCard;
