import footerStyles from "./Footer.module.css";
import React from "react";
import { deleteTodosList } from "../../store/slices/todos";
import { ButtonForm } from "./ButtonForm/ButtonForm";

export const Footer = ({
  dispatch,
  todosList,
  completeTodos,
  setIsComplete,
  setIsActive,
}) => {
  const itemsLeft = todosList.length - completeTodos.length;
  const handleDeleteList = () => {
    let keys = [];
    for (let i in completeTodos) {
      keys = [...keys, completeTodos[i].key];
    }
    dispatch(deleteTodosList(keys));
  };
  return (
    <div className={footerStyles.menu}>
      <div className={footerStyles.items}>
        {itemsLeft ? ` ${itemsLeft} items left` : "Done!"}
      </div>
      <div className={footerStyles.buttons}>
        <ButtonForm
          name="All"
          complete={false}
          active={false}
          setIsComplete={setIsComplete}
          setIsActive={setIsActive}
        />
        <ButtonForm
          name="Active"
          complete={false}
          active={true}
          setIsComplete={setIsComplete}
          setIsActive={setIsActive}
        />
        <ButtonForm
          name="Completed"
          complete={true}
          active={false}
          setIsComplete={setIsComplete}
          setIsActive={setIsActive}
        />
      </div>
      <button className={footerStyles.clear} onClick={handleDeleteList}>
        Clear Completed
      </button>
    </div>
  );
};
