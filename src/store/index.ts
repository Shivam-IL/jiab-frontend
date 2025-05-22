import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    /* Reducers here */
  },
});

// Types for use in hooks and components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
