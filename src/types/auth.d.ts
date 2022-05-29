interface ISignInData {
  login: string;
  password: string;
}

interface ISignUpData extends ISignInData {
  name: string;
}
