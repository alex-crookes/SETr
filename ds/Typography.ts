import { StyleProp, TextStyle } from "react-native";


const fontWeights: Record<string, string> = {
  reduced: "300",
  default: "400",
  lightEmphasis: "500",
  emphasis: "600",
  heavy: "700",
  extraBold: "800",
};




// #region Display Text
const displayLarge: StyleProp<TextStyle> = {
  fontSize: 57,
  lineHeight: 64,
  letterSpacing: -0.25,
  fontWeight: fontWeights.default,
};
const displayMedium: StyleProp<TextStyle> = {
  fontSize: 45,
  lineHeight: 52,
  letterSpacing: 0,
  fontWeight: fontWeights.default,
};
const displaySmall: StyleProp<TextStyle> = {
  fontSize: 36,
  lineHeight: 44,
  letterSpacing: 0,
  fontWeight: fontWeights.default,
};

// #endregion Display Text

// #region Headline Text

const headlineLarge: StyleProp<TextStyle> = {
  fontSize: 32,
  lineHeight: 40,
  letterSpacing: 0,
  fontWeight: fontWeights.default,
};
const headlineMedium: StyleProp<TextStyle> = {
  fontSize: 28,
  lineHeight: 36,
  letterSpacing: 0,
  fontWeight: fontWeights.default,
};
const headlineSmall: StyleProp<TextStyle> = {
  fontSize: 24,
  lineHeight: 32,
  letterSpacing: 0,
  fontWeight: fontWeights.default,
};

// #endregion Headline Text

// #region Title Text

const titleLarge: StyleProp<TextStyle> = {
  fontSize: 22,
  lineHeight: 28,
  letterSpacing: 0,
  fontWeight: fontWeights.default,
};
const titleMedium: StyleProp<TextStyle> = {
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.15,
  fontWeight: fontWeights.lightEmphasis,
};
const titleSmall: StyleProp<TextStyle> = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  fontWeight: fontWeights.lightEmphasis,
};

// #endregion Title Text

// #region Body Text

const bodyLarge: StyleProp<TextStyle> = {
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.5,
  fontWeight: fontWeights.default,
};
const bodyMedium: StyleProp<TextStyle> = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.25,
  fontWeight: fontWeights.default,
};
const bodySmall: StyleProp<TextStyle> = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.4,
  fontWeight: fontWeights.default,
};

// #endregion Title Text

// #region Label Text

const labelLarge: StyleProp<TextStyle> = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  fontWeight: fontWeights.lightEmphasis,
};
const labelLargeProminent: StyleProp<TextStyle> = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  fontWeight: fontWeights.heavy,
};
const labelMedium: StyleProp<TextStyle> = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.5,
  fontWeight: fontWeights.lightEmphasis,
};
const labelMediumProminent: StyleProp<TextStyle> = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.5,
  fontWeight: fontWeights.heavy,
};
const labelSmall: StyleProp<TextStyle> = {
  fontSize: 11,
  lineHeight: 16,
  letterSpacing: 0.4,
  fontWeight: fontWeights.lightEmphasis,
};

// #endregion label Text
