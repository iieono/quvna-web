import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/authApi';
import { ratingApi } from './features/ratingApi'; // Import the ratingApi

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer, // Add the ratingApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(ratingApi.middleware), // Add the ratingApi middleware
});
