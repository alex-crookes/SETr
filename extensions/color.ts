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
