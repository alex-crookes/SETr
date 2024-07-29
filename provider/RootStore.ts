import {  configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ExpensesReducer from "./ExpensesReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AppSettingsStorage from "./AppSettingsStorage";

const appSettingsPersistor = {
  key: "appSettings",
  version: 1,
  storage: AsyncStorage,
};
const persistedAppSettingsReducer = persistReducer(
  appSettingsPersistor, AppSettingsStorage
);

const combinedReducer = combineReducers({
  expensesStore: ExpensesReducer,
  appSettingsStore: persistedAppSettingsReducer,
});

export const reduxStore = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;
