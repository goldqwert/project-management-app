import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import { Cookies } from 'typescript-cookie';

import { authReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies),
};

const rootReducer = combineReducers({ auth: authReducer });

const _persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
