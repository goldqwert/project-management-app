interface AuthState {
  authToken: null | string;
  authUserId: null | string;
}

interface AuthUserData {
  userId: string;
}

export type { AuthState, AuthUserData };
