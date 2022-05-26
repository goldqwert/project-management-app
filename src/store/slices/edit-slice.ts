import { createSlice } from '@reduxjs/toolkit';

export interface EditState {
  name: string;
  login: string;
  password: string;
  error: null | string;
}
const initialState: EditState = {
  name: '',
  login: '',
  password: '',
  error: null,
};
const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    editUserName(state, action) {
      state.name = action.payload;
    },
    editUserLogin(state, action) {
      state.login = action.payload;
    },
    editUserPassword(state, action) {
      state.password = action.payload;
    },
    showError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { editUserName, showError, editUserLogin, editUserPassword } =
  editSlice.actions;
export default editSlice.reducer;
