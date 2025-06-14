import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import profileReducer from "./profile/profile.slice";
import cmsReducer from "./cms/cms.slice";
import languageReducer from "./language/language.slice";
import leaderboardReducer from "./leaderboard/index";
import ugcReducer from "./ugc/index";
import referenceReducer from "./reference";

// Configure persistence for CMS
const cmsPersistConfig = {
  key: "cms",
  storage,
  whitelist: ["homePageContent"], // Only persist homePageContent, not loading states or errors
};

// Configure root persistence (if you want to persist other slices later)
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cms"], // Only persist the cms slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cms: persistReducer(cmsPersistConfig, cmsReducer),
  language: languageReducer,
  leaderboard: leaderboardReducer,
  ugc: ugcReducer,
  reference: referenceReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types for use in hooks and components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
