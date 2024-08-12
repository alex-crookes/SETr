import { ColorValue } from "react-native";

export const hexToRGB = (hex) => {
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }
  hex = "0x" + hex;
  let r = (hex >> 16) & 0xff;
  let g = (hex >> 8) & 0xff;
  let b = hex & 0xff;
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 *
 * @param color
 * @param opacity
 * @returns
 */
export const addOpacityToColor = (
  color: ColorValue,
  opacity: number
): ColorValue => {
  color = color.toString();
  const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  if (!hexColorRegex.test(color)) {
    throw new Error("Invalid color format");
  }

  // Remove the leading '#' if present
  if (color.startsWith("#")) {
    color = color.slice(1);
  }

  // Convert 3-digit hex to 6-digit hex
  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Validate the opacity input
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be a number between 0 and 1");
  }

  // Convert opacity to a two-digit hex string
  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  // Return the color with the opacity value appended
  return `#${color}${opacityHex}`.toUpperCase() as ColorValue;
};
