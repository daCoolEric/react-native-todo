import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewTask } = newTaskSlice.actions;

export default newTaskSlice.reducer;
