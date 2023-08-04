import { configureStore } from '@reduxjs/toolkit';
import { baseApiSlice } from './slice/api/baseAPISlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'Production',
});
