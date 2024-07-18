import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ExpensesReducer from "./ExpensesReducer";

const combinedReducer = combineReducers({
  ExpensesReducer,
});

export const reduxStore = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof reduxStore.getState>;
