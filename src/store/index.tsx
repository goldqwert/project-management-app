import { configureStore } from '@reduxjs/toolkit';
import signUpData from './slices/signUp-slice';
import signInData from './slices/signin-slice';

const store = configureStore({
  reducer: { signUp: signUpData, signIn: signInData },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
