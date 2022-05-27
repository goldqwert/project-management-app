import { createSlice } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { removeCookie } from 'typescript-cookie';

export interface DeleteState {
  id: string;
  error: null | string;
}

const initialState: DeleteState = {
  id: '',
  error: null,
};

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {
    deleteUser(state, action) {
      state.id = action.payload;
      removeCookie("jwt");
      removeCookie("id");
      // storage.removeItem('persist:root');
    },
    showError(state, action) {
      state.error = action.payload;
    },
  },
});
export const { deleteUser, showError } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
