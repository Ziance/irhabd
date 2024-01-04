// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

export const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});
