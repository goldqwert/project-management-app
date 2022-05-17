export interface InitialSignInState {
  login: string;
  password: string;
  getLoginData: {
    login: string;
    password: string;
  };
  isAuth: boolean;
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
