import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../Reducers/todoListSlice";

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});
