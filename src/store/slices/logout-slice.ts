import { createSlice } from '@reduxjs/toolkit';
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
    clearUserData(state, action) {
      state.userData = action.payload;
      // в dispatch прописать storage.removeItem('persist:root')
    },
  },
});
export const { clearUserData } = logout.actions;
export default logout.reducer;
