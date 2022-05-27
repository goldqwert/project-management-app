import store from '../store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatchStore = store.dispatch;

export interface InitialSignInState {
  login: string;
  password: string;
  getLoginData: {
    login: string;
    password: string;
  };
  token: string | null;
  error?: null | string;
}

export interface InitialSignUpState {
  name?: string;
  login: string;
  password: string;
  confirmPassword?: string;
  userData?: {
    id: string;
    name: string;
    login: string;
  };
  error?: null | string;
}
