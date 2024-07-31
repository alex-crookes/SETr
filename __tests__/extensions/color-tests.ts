import { hexToRGB } from "../../extensions/color";

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
