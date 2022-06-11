import addformStyles from "./AddForm.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTodo } from "../../store/slices/todos";
import { useAddTask } from "../../utils/hooks";

export const AddForm = ({ todosList, isLoading }) => {
  const dispatch = useDispatch();

  const [taskValue, setTaskValue] = useState("");
  const handleTaskValue = (e) => {
    setTaskValue(e.target.value);
  };

  const handleCreateTodo = () => {
    if (taskValue && !isLoading) {
      const newTodo = {
        key: todosList.length + 1,
        name: taskValue,
        completed: false,
      };
      dispatch(createNewTodo(newTodo));
      setTaskValue("");
    }
  };

  useAddTask(handleCreateTodo);
  return (
    <div className={addformStyles.form}>
      <input
        className={addformStyles.input}
        value={taskValue}
        onChange={handleTaskValue}
        type="text"
        placeholder="What needs to be done?"
        required
      />
      <button className={addformStyles.button} onClick={handleCreateTodo}>
        +
      </button>
    </div>
  );
};
