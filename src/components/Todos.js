import todosStyles from "./Todos.module.css";
import React, { useEffect, useState } from "react";
import { AddForm } from "./AddForm/AddForm";
import { editTodo, fetchTodos, selectTodosData } from "../store/slices/todos";
import { useDispatch, useSelector } from "react-redux";
import { TodosItem } from "./TodosItem/TodosItem";
import { Footer } from "./Footer/Footer";

export const TodoList = () => {
  const { todosList, isLoading } = useSelector(selectTodosData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const [isComplete, setIsComplete] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const activeTodos = todosList.filter((todo) => !todo.completed);
  const completeTodos = todosList.filter((todo) => todo.completed);

  const todos = isActive ? activeTodos : isComplete ? completeTodos : todosList;
  
  const handleChecked = (index) => {
    const updatedTodo = [...todos];
    updatedTodo[index] = {
      ...updatedTodo[index],
      completed: !updatedTodo[index].completed,
    };
    dispatch(editTodo(updatedTodo[index]));
    selectTodosData(updatedTodo);
  };

  const todosUI = todos.map((todo, pos) => {
    return (
      <TodosItem
        isLoading={isLoading}
        key={todo.key}
        {...todo}
        check={() => handleChecked(pos)}
      />
    );
  });

  return (
    <div className={todosStyles.container}>
      <AddForm todosList={todosList} isLoading={isLoading} />
      {todosUI}
      <Footer
        todosList={todosList}
        dispatch={dispatch}
        completeTodos={completeTodos}
        setIsComplete={setIsComplete}
        setIsActive={setIsActive}
      />
    </div>
  );
};
