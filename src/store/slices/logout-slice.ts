import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { removeCookie } from 'typescript-cookie';
export interface LogoutState {
  userData: {
  };
}

const initialState: LogoutState = {
  userData: {},
};
const logout = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    clearUserData() {
      removeCookie("id");
      removeCookie("jwt");
      // в dispatch прописать storage.removeItem('persist:root')
    },
  },
});
export const { clearUserData } = logout.actions;
export default logout.reducer;
