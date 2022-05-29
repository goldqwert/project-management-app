import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface IAuthState {
  user: Omit<UserType, 'password'> | null;
  isAuth: boolean;
  error: null | string
}

export const initialState: IAuthState = {
  user: null,
  isAuth: false,
  error: null
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signUp(state: IAuthState, action: PayloadAction<Omit<UserType, 'password'>>): void {
        state.isAuth = false;
      },
      signIn(state: IAuthState, action: PayloadAction<Omit<UserType, 'password'>>): void {
        state.user = action.payload,
        state.isAuth = true;
      },
      logOut(state: IAuthState, action: PayloadAction<UserType, 'password'>): void {
        state.user = null,
        state.isAuth = false;
      },
      updateUser(state: IAuthState, action: PayloadAction<UserType, 'password'>): void {
        state.user = action.payload
      },
      deleteUser(state: IAuthState, action: PayloadAction<string>): void {
        state.user = null,
        state.isAuth = false;
      },
      showError(state: IAuthState, action: PayloadAction<string | null>) {
        state.error = action.payload
      }
    }
})

  
export const {
  signUp,
  signIn,
  logOut,
  updateUser,
  deleteUser,
  showError
} = authSlice.actions
export default authSlice.reducer
