import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      return {
        // returning a copy of orignal state
        ...state, //copying the original state
        todos: [...state.todos, action.payload], //new todos array
      };
    },
    deleteTodo: (state, action) => {
      return {
        // returning a copy of orignal state
        ...state, //copying the original state
        todos: state.todos.filter((todo) => todo.id !== action.payload), // returns a new filtered todos array
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodoList, deleteTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
