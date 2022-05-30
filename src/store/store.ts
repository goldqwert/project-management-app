import { configureStore } from '@reduxjs/toolkit';

import { boardsReducer } from './reducers';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

export default store;
