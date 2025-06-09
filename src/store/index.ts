import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import profileReducer from './profile/profile.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer
  },
});

// Types for use in hooks and components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
