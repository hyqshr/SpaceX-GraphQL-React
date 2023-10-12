// store.ts
import { configureStore } from '@reduxjs/toolkit';
import reportReducer from './reportSlice'; // replace with path to your reportSlice file

const store = configureStore({
  reducer: {
    reports: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;