import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
export interface LogoutState {
  userData: {
    // login: string;
    // password: string;
    // name: string;
    // id: string;
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
     // state.userData = action.payload;
      storage.removeItem('persist:root');
      // в dispatch прописать storage.removeItem('persist:root')
    },
  },
});
export const { clearUserData } = logout.actions;
export default logout.reducer;
