import { setAuthToken, setIsAuth, logout } from './reducers';
import { store, persistor } from './store';
import { RootState, AppDispatch } from './types';

export type { RootState, AppDispatch };
export { store, persistor, setAuthToken, setIsAuth, logout };
