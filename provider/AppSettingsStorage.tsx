import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deepmerge from "deepmerge";

const settingsKey = "gavin2";

const defaultThemeSettings: ThemeSettings = {
  useDarkMode: false,
  baseGrid: 8,
  baseFont: "Roboto",
};

/**
 * Context Provider for persisting App Settings
 *
 * Includes themeSettings/updateThemeSettings
 *
 * Note: expand with new objects as needed
 */
export const AppSettingsContext = createContext({
  themeSettings: defaultThemeSettings,
  updateThemeSettings: (settings: ThemeSettings) => {},
});

const AppSettingsProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [themeSettings, setThemeSettings] =
    useState<ThemeSettings>(defaultThemeSettings);

  // run on first load
  useEffect(() => {
    try {
      AsyncStorage.getItem(settingsKey).then((loadedSettings) => {
        if (!loadedSettings) {
          console.log("No settings found, using defaults");
          setThemeSettings(defaultThemeSettings);
          return;
        }
        const loaded = JSON.parse(loadedSettings) as AppSettings;
        const newThemeSettings = {
          ...defaultThemeSettings,
          ...loaded.themeSettings,
        };
        setThemeSettings(newThemeSettings);
        console.log(
          "Settings Loaded?: ",
          loaded,
          " and new theme is ",
          newThemeSettings
        );
      });
    } catch (error) {
      console.error("Error loading settings: ", error);
      AsyncStorage.removeItem(settingsKey).finally(() => {
        setThemeSettings(defaultThemeSettings);
      });
    }
  }, []);

  const updateThemeSettings = async (settings: ThemeSettings) => {
    console.log("Updating Theme Settings: ", settings);
    persistAppSettings(settings)
      .then(() => {
        console.log("storing settings", settings);

        setThemeSettings((previous) => {
          return { ...previous, ...settings };
        });
      })
      .catch((error) => {
        console.error("Error saving settings: ", error);
      })
      .finally(() => {  
        AsyncStorage.getItem(settingsKey).then((loadedSettings) => {
          console.log("File After write: ", loadedSettings);
        })
      });
  };

  const persistAppSettings = async (theme: ThemeSettings): Promise<void> => {
    const newSettings = {
      themeSettings: theme,
    };
    console.log("New settings to be written are ", newSettings);
    return AsyncStorage.setItem(settingsKey, JSON.stringify(newSettings));
  };

  return (
    <AppSettingsContext.Provider
      value={{
        themeSettings: themeSettings,
        updateThemeSettings: updateThemeSettings,
      }}
    >
      {props.children}
    </AppSettingsContext.Provider>
  );
};

export type AppSettings = {
  themeSettings: ThemeSettings;
};

export type ThemeSettings = {
  useDarkMode: boolean;
  baseGrid: number;
  baseFont: string;
};

export default AppSettingsProvider;
