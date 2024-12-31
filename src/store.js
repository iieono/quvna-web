import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/authApi';
import { ratingApi } from './features/ratingApi'; // Import the ratingApi
import { checkApi } from './features/historyApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer, // Add the ratingApi reducer
    [checkApi.reducerPath]: checkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(ratingApi.middleware) // Add the ratingApi middleware
      .concat(checkApi.middleware), // Add the ratingApi middleware
});
