import { createSlice } from '@reduxjs/toolkit';

export interface InitialSignUpState {
  name?: string;
  login: string;
  password: string;
  confirmPassword?: string;
  userData?: {},
  error?: null | string;
}
const initialState:InitialSignUpState = {
  name: "",
  login: "",
  password: "",
  confirmPassword:"",
  userData: {},
  error: null,
}
const signUpData = createSlice({
  name: "signUp",
  initialState,
  reducers: {
  getNameData(state, action) {
    state.name = action.payload;
  },
  getLoginData(state, action) {
    state.login = action.payload;
  },
  getPasswordData(state, action) {
    state.password = action.payload;
  },
    getConfirmPasswordData(state, action) {
    state.confirmPassword = action.payload;
    },
  getUserData(state, action) {
    state.userData = action.payload;
  },
    showError(state, action) {
    state.error = action.payload;
    },
  }
});

export const {getNameData, getLoginData, getPasswordData, getUserData, showError, getConfirmPasswordData} = signUpData.actions;

export default signUpData.reducer;