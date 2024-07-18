import { getCurrentMilliseconds } from "../../extensions/time";

describe("Time Extension Tests", () => {
  // test is dumb as it's essentally the same function under test...
  it("get Milliseconds Correctly", () => {
    const sut = getCurrentMilliseconds();    
    expect(sut).toBeCloseTo(new Date().getTime(), -1);    
  });
});
