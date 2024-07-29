import { createSlice } from "@reduxjs/toolkit";

export const defaultThemeSettings: ThemeSettings = {
  useDarkMode: false,
  baseGrid: 8,
  baseFont: "Roboto",
};

const intialState: AppSettings = {
  themeSettings: defaultThemeSettings,
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState: intialState,
  reducers: {
    updateThemeSettings(state, action) {
      state.themeSettings = action.payload;
    },
    useDarkMode(state, action) {
      state.themeSettings.useDarkMode = action.payload;
    },
  },
});

export type AppSettings = {
  themeSettings: ThemeSettings;
};

export type ThemeSettings = {
  useDarkMode: boolean;
  baseGrid: number;
  baseFont: string;
};

//export default AppSettingsProvider;

export default appSettingsSlice.reducer;
export const appSettingsActions = appSettingsSlice.actions;
