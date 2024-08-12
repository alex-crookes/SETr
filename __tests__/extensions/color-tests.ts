import { ColorValue } from "react-native";
import { addOpacityToColor, hexToRGB } from "../../extensions/color";

describe("Color Extension Tests", () => {
  it("Check Black in format #000000", () => {
    const input = "#000000";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(0, 0, 0)");
  });

  it("Check Black in format #000", () => {
    const input = "#000";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(0, 0, 0)");
  });

  it("Check Black in format 000000", () => {
    const input = "000000";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(0, 0, 0)");
  });

  it("Check Black in format 000", () => {
    const input = "000";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(0, 0, 0)");
  });

  it("Check Red ", () => {
    const input = "#FF0000";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(255, 0, 0)");
  });

  it("Check White ", () => {
    const input = "#FFFFFF";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(255, 255, 255)");
  });
  it("Check Grey ", () => {
    const input = "#CCCDCE";
    const sut = hexToRGB(input);
    expect(sut).toBe("rgb(204, 205, 206)");
  });
});

describe("Opacity Extension Tests", () => {
  it("Check Black with 00% opacity", () => {
    const input: ColorValue = "#000000";
    const opacity = 0;
    const sut = addOpacityToColor(input, opacity);
    expect(sut).toBe("#00000000");
  });
  it("Check Black with 50% opacity", () => {
    const input: ColorValue = "#000000";
    const opacity = 0.5;
    const sut = addOpacityToColor(input, opacity);
    expect(sut).toBe("#00000080");
  });
  it("Check Black with 50% opacity", () => {
    const input: ColorValue = "#000000";
    const opacity = 1;
    const sut = addOpacityToColor(input, opacity);
    expect(sut).toBe("#000000FF");
  });
});
