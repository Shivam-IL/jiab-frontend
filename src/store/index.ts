import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import profileReducer from './profile/profile.slice';
import cmsReducer from './cms/cms.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cms: cmsReducer,
  },
});

// Types for use in hooks and components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
