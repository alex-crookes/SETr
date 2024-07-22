import { localizeNumber, roundNumber } from "../localization/Localization";

describe("Localize Number test", () => {
  // test is dumb as it's essentally the same function under test...
  it("get Milliseconds Correctly", () => {

    const sut = localizeNumber(20000);
    expect(sut).toBe("20,000");
  });
});

describe("Rounded Test", () => {
  it("round to 2 decimal places", () => {
    const sut = roundNumber(20000.12345, 2);
    expect(sut).toBe("20,000.12");
  })
} )