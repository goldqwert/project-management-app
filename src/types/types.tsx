export interface InitialSignInState {
  login: string;
  password: string;
  getLoginData: {};
  isAuth: boolean;
}

export interface InitialSignUpState {
  name?: string;
  login: string;
  password: string;
  confirmPassword?: string;
  userData?: {},
  error?: null | string;
}