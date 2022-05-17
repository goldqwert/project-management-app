import { createSlice } from '@reduxjs/toolkit';

export interface InitialSignInState {
  login: string;
  password: string;
  getLoginData: {};
  isAuth: boolean;
}
const initialState: InitialSignInState = {
  login: "",
  password: "",
  getLoginData: {},
  isAuth: false,
}

const signInData = createSlice({
  name: "signIn",
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
    }
  }
});
export const {getLoginForSignIn, getPasswordForSignIn, getLoginDataFromUser, setIsAuth} = signInData.actions;

export default signInData.reducer;