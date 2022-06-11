import itemStyles from "./TodosItem.module.css";
import React from "react";
import { Preloader } from "../Preloader/Preloader";

export const TodosItem = ({ name, completed, check, isLoading }) => {
  const customComplete = completed ? (
    <div className={itemStyles.done}>{name}</div>
  ) : (
    name
  );
  return (
    <Preloader isLoading={isLoading}>
      <div className={itemStyles.item}>
        <input
          className={itemStyles.checkbox}
          checked={completed}
          onChange={check}
          type="checkbox"
        />
        <div className={itemStyles.name}>{customComplete}</div>
      </div>
    </Preloader>
  );
};
