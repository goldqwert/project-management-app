import { createSlice } from '@reduxjs/toolkit';

export interface EditState {
  userData: {
    name: string,
    login: string,
    password: string
  },
  error: null | string;
}
const initialState: EditState = {
  userData:  {
    name: "",
    login: "",
    password: "",
  },
  error: null,
}
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editUser(state, action) {
      state.userData = action.payload;
    },
    showError(state, action) {
      state.error = action.payload;
    },
  }
});

export const {editUser, showError} = editSlice.actions;
export default editSlice;