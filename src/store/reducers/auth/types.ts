interface AuthState {
  authToken: null | string;
  authUserId: null | string;
  isAuth: boolean;
}

interface AuthUserData {
  userId: string;
}

export type { AuthState, AuthUserData };
