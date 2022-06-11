import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TODOS_URL } from "../../utils/constants";

const initialState = {
  todosList: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(TODOS_URL);
  if (response.ok) {
    return await response.json();
  } else {
    return new Error("Ошибка при получении списка.");
  }
});

export const createNewTodo = createAsyncThunk(
  "todos/createNewTodo",
  async (newTodo) => {
    const response = await fetch(TODOS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      return await response.json();
    } else {
      return new Error("Ошибка при создании задачи");
    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (updatedTodo) => {
    const response = await fetch(TODOS_URL + updatedTodo.key, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      return await response.json();
    } else {
      return new Error("Ошибка при редактировании поста");
    }
  }
);
export const deleteTodosList = createAsyncThunk(
  "todos/deleteTodosList",
  async (idList) => {
    for (const id of idList) {
      const response = await fetch(TODOS_URL + id, { method: "DELETE" });
      if (response.ok) {
        await response.json();
      } else {
        new Error("Ошибка при удалении списка");
      }
    }
  }
);
const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todosList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(createNewTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewTodo.fulfilled, (state, action) => {
      state.todosList.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(createNewTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(editTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.todosList = state.todosList.map((todo) => {
        if (todo.key === action.payload.key) {
          return action.payload;
        }
        return todo;
      });
      state.isLoading = false;
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(deleteTodosList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodosList.fulfilled, (state, action) => {
      state.todosList = state.todosList.filter(
        (todo) => !action.meta.arg.includes(todo.key)
      );
      state.isLoading = false;
    });
    builder.addCase(deleteTodosList.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const todosReducer = todosSlice.reducer;

export const selectTodosData = (state) => state.todos;
