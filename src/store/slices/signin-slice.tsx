import { createSlice } from '@reduxjs/toolkit';
import { InitialSignInState } from '../../types/types';

const initialState: InitialSignInState = {
  login: '',
  password: '',
  getLoginData: {
    login: '',
    password: '',
  },
  isAuth: false,
  token: '',
  error: null,
};

const signInData = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    getLoginForSignIn(state, action) {
      state.login = action.payload;
    },
    getPasswordForSignIn(state, action) {
      state.password = action.payload;
    },
    getLoginDataFromUser(state, action) {
      state.getLoginData = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    getToken(state, action) {
      state.token = action.payload;
    },
    showError(state, action) {
      state.error = action.payload;
    },
  },
});
export const {
  getLoginForSignIn,
  getPasswordForSignIn,
  getLoginDataFromUser,
  setIsAuth,
  getToken,
  showError,
} = signInData.actions;

export default signInData.reducer;
