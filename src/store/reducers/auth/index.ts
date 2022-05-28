import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { AuthState, AuthUserData } from './types';

const initialState: AuthState = { authToken: null, authUserId: null, isAuth: false };

// const signInAsync = createAsyncThunk(
//   'search/get',
//   async ({ name, login, password }: ISignUpData, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${API_URL}signup`, {
//         method: 'POST',
//         body: JSON.stringify({ name, login, password }),
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();

//       if (response.status === HTTP_STATUS.CREATED) {
//         openNotification('success', 'User successfully created! You can login!');
//         return data;
//       }

//       return rejectWithValue(data.message);
//     } catch (error) {
//       console.warn('search result', error);
//     }
//   }
// );

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      state.authUserId = jwt_decode<AuthUserData>(action.payload).userId;
      state.isAuth = true;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.authToken = null;
      state.authUserId = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    // [signUpAsync.fulfilled.type]: (state) => {
    //   state.isSignUpLoading = false;
    // },
    // [signUpAsync.pending.type]: (state) => {
    //   state.isSignUpLoading = true;
    // },
    // [signUpAsync.rejected.type]: (state, action) => {
    //   state.isSignUpLoading = false;
    //   openNotification('error', action.payload);
    // },
  },
});

const { setAuthToken, setIsAuth, logout } = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer, setAuthToken, setIsAuth, logout };