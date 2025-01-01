import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/authApi';
import { ratingApi } from './features/ratingApi'; // Import the ratingApi
import { checkApi } from './features/historyApi';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer, // Add the ratingApi reducer
    [checkApi.reducerPath]: checkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions related to non-serializable data (like Blob)
        ignoredActions: [
          'ratingApi/executeQuery/fulfilled', // Ignore fulfilled actions from ratingApi
        ],
        ignoredPaths: ['ratingApi.queries.getAttachment.data'], // Ignore this specific path in state where Blob is stored
      },
    })
      .concat(authApi.middleware)
      .concat(ratingApi.middleware) // Add the ratingApi middleware
      .concat(checkApi.middleware), // Add the checkApi middleware
});
