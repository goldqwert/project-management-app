import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import signUpData from './slices/signUp-slice';
import signInData from './slices/signin-slice';
import logout from './slices/logout-slice';
import edit from './slices/edit-slice';
import deleteUser from './slices/deleteUser-slice';
import newBoard from './slices/board-slice';

const rootReducer = combineReducers({
  signUp: signUpData,
  signIn: signInData,
  logout,
  edit,
  delete: deleteUser,
  board: newBoard,
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
