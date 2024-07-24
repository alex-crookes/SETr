import React, { useState, createContext, useEffect } from "react";
import themeColors from "../material-theme.json";
import { ColorValue, DimensionValue, StyleSheet } from "react-native";
import { ColorPalette } from "./ColorPalette";

// #region Typography

enum Fw {
  Lightest = "100",
  Lighter = "200",
  Light = "300",
  Default = "400",
  LightEmphasis = "500",
  Emphasis = "600",
  Heavy = "700",
  ExtraBold = "800",
}

function buildTypeScale(palette: ColorPalette, fontName: string) {
  const baseBody = {
    fontFamily: fontName,
    color: palette.onSurface as ColorValue,
    fontWeight: Fw.Default,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  };

  const materialStyles = StyleSheet.create({
    // #region Display Text
    displayLarge: {
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: -0.25,
      ...baseBody,
    },
    displayMedium: {
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      ...baseBody,
    },
    displaySmall: {
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      ...baseBody,
    },

    // #endregion Display Text

    // #region Headline Text

    headlineLarge: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      ...baseBody,
    },
    headlineMedium: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      ...baseBody,
    },
    headlineSmall: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      ...baseBody,
    },

    // #endregion Headline Text

    // #region Title Text

    titleLarge: {
      ...baseBody,
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
    },
    titleMedium: {
      ...baseBody,
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: Fw.Emphasis,
    },
    titleSmall: {
      ...baseBody,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: Fw.Emphasis,
    },

    // #endregion Title Text

    // #region Body Text

    bodyLarge: {
      ...baseBody,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    bodyMedium: {
      ...baseBody,
    },
    bodySmall: {
      ...baseBody,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
    },

    // #endregion Title Text

    // #region Label Text
    labelLarge: {
      ...baseBody,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
    },

    labelMedium: {
      ...baseBody,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
    },
    labelSmall: {
      ...baseBody,
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    // #endregion Label Text
  });

  return StyleSheet.create({
    body: { ...baseBody },
    bodyError: { ...baseBody, color: palette.error },
    bodySmall: { ...materialStyles.bodySmall },
    bodySmallPassive: {
      ...materialStyles.bodySmall,
      color: palette.onSurfaceVariant,
    },
    caption: {
      ...materialStyles.labelSmall,
    },
    title: { ...materialStyles.titleMedium },
    titleLarge: {
      ...materialStyles.titleLarge,
    },
    titleSmall: { ...materialStyles.titleSmall },
    labelLarge: {
      ...materialStyles.labelLarge,
      color: "#FF00FF",
    },
  });
}

// #endregion Typography

// #region Measurements

type Measurements = {
  oneQuarterX: DimensionValue;
  oneHalfX: DimensionValue;
  oneX: DimensionValue;
  oneAndHalfX: DimensionValue;
  twoX: DimensionValue;
  twoAndHalfX: DimensionValue;
  threeX: DimensionValue;
  threeAndHalfX: DimensionValue;
  fourX: DimensionValue;
  fiveX: DimensionValue;
  sixX: DimensionValue;
  sevenX: DimensionValue;
  eightX: DimensionValue;
  nineX: DimensionValue;
  tenX: DimensionValue;
  twelveX: DimensionValue;
  fourteenX: DimensionValue;
  sixteenX: DimensionValue;
  twentyX: DimensionValue;
  twentyFourX: DimensionValue;
  thirtyTwoX: DimensionValue;
  fortyX: DimensionValue;
  pageGutter: DimensionValue;
  sectionGap: DimensionValue;
  elementGap: DimensionValue;
  paragraphGap: DimensionValue;
};

function buildMeasurements(gridSize: number): Measurements {
  return {
    oneQuarterX: (gridSize * 0.25) as DimensionValue,
    oneHalfX: (gridSize * 0.5) as DimensionValue,
    oneX: (gridSize * 1) as DimensionValue,
    oneAndHalfX: (gridSize * 1.5) as DimensionValue,
    twoX: (gridSize * 2) as DimensionValue,
    twoAndHalfX: (gridSize * 2.5) as DimensionValue,
    threeX: (gridSize * 3) as DimensionValue,
    threeAndHalfX: (gridSize * 3.5) as DimensionValue,
    fourX: (gridSize * 4) as DimensionValue,
    fiveX: (gridSize * 5) as DimensionValue,
    sixX: (gridSize * 6) as DimensionValue,
    sevenX: (gridSize * 7) as DimensionValue,
    eightX: (gridSize * 8) as DimensionValue,
    nineX: (gridSize * 9) as DimensionValue,
    tenX: (gridSize * 10) as DimensionValue,
    twelveX: (gridSize * 12) as DimensionValue,
    fourteenX: (gridSize * 14) as DimensionValue,
    sixteenX: (gridSize * 16) as DimensionValue,
    twentyX: (gridSize * 20) as DimensionValue,
    twentyFourX: (gridSize * 24) as DimensionValue,
    thirtyTwoX: (gridSize * 32) as DimensionValue,
    fortyX: (gridSize * 40) as DimensionValue,
    pageGutter: (gridSize * 2) as DimensionValue,
    sectionGap: (gridSize * 4) as DimensionValue,
    elementGap: (gridSize * 2) as DimensionValue,
    paragraphGap: (gridSize * 1) as DimensionValue,
  };
}

// #endregion Measurements

// #region Blocks

function buildBlocks(colors: ColorPalette, measurements: Measurements) {
  return StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: colors.surface,
      paddingHorizontal: measurements.pageGutter,
    },
    pageContainer: {
      /*backgroundColor: colors.background*/
    },
    section: { marginTop: measurements.sectionGap },
    element: { marginTop: measurements.paragraphGap },
    paragraph: { marginTop: measurements.paragraphGap },
    inputTextField: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outline,
      backgroundColor: colors.outlineVariant,
      borderRadius: measurements.oneHalfX,
      padding: measurements.oneX,
      marginBottom: measurements.oneX,
      color: colors.onSurface,
    },
  });
}
// #endregion Blocks

const defaultOptions: ThemeOptions = {
  baseGrid: 8,
  baseFont: "Roboto",
};

// #region Theme Building

const defaultColors: ColorPalette = themeColors.schemes.light;
const defaultMeasurements = buildMeasurements(defaultOptions.baseGrid);
export const ThemeContext = createContext({
  isDarkTheme: false,
  measurements: defaultMeasurements,
  colors: defaultColors,
  blocks: buildBlocks(defaultColors, defaultMeasurements),
  typography: buildTypeScale(defaultColors, defaultOptions.baseFont),
  toggleTheme: () => {},
  buildWithOptions: (options: ThemeOptions) => {},
});

const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  // #region Properties
  /**
   * Define the Basic Theme Options; Color scheme is imported from Material
   */
  const [options, setOptions] = useState<ThemeOptions>(defaultOptions);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [measurements, setMeasurements] = useState<Measurements>(
    buildMeasurements(options.baseGrid)
  );

  const [colors, setColors] = useState<ColorPalette>(themeColors.schemes.light);
  const [typopgraphy, setTypography] = useState(
    buildTypeScale(colors, options.baseFont)
  );

  // #endregion Properties

  // #region Helpers

  /**
   * Rebuilds the Actual theme
   */
  const buildTheme = (useDarkMode: boolean) => {
    setIsDarkTheme(useDarkMode);
    setMeasurements(buildMeasurements(options.baseGrid));
    const newPalette = isDarkTheme
      ? themeColors.schemes.dark
      : themeColors.schemes.light;
    setColors(newPalette);

    const newTypeScale = buildTypeScale(newPalette, options.baseFont);
    setTypography(newTypeScale);
  };

  /**
   * Updates the theme to Dark <-> Light and rebuilds
   */
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    buildTheme(newTheme);
  };

  /**
   * Updates the theme baseGrid and/or FontName and rebuilds
   */
  const buildWithOptions = (options: ThemeOptions) => {
    setOptions(options);
    buildTheme(true); // default to light Mode...
  };

  // #endregion Helpers
  console.log(
    "Theme Provider Rendered in Mode: ",
    isDarkTheme ? "Dark" : "Light"
  );
  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        colors,
        measurements: measurements,
        typography: typopgraphy,
        blocks: buildBlocks(colors, measurements),
        toggleTheme,
        buildWithOptions,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

type ThemeOptions = {
  baseGrid: number;
  baseFont: string;
};

// #endregion Theme Building
