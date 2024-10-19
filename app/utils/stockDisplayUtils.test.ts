import {
  formatIntoCurrency,
  formatIntoPercentDisplay,
} from "./stockDisplayUtils";

describe("formatIntoCurrency", () => {
  it("should format a positive number without the plus sign when includeSign is omitted", () => {
    const result = formatIntoCurrency(1000);
    expect(result).toBe("$1,000.00");
  });

  it("should format a positive number without the plus sign when includeSign is false", () => {
    const result = formatIntoCurrency(1000, false);
    expect(result).toBe("$1,000.00");
  });

  it("should format a positive number with the plus sign when includeSign is true", () => {
    const result = formatIntoCurrency(1000, true);
    expect(result).toBe("+$1,000.00");
  });

  it("should format a negative number correctly", () => {
    const result = formatIntoCurrency(-500);
    expect(result).toBe("-$500.00");
  });

  it("should format zero without the plus sign", () => {
    const result = formatIntoCurrency(0);
    expect(result).toBe("$0.00");
  });

  it("should format zero with the plus sign when includeSign is true", () => {
    const result = formatIntoCurrency(0, true);
    expect(result).toBe("+$0.00");
  });

  it("should format a large number correctly", () => {
    const result = formatIntoCurrency(1000000);
    expect(result).toBe("$1,000,000.00");
  });

  it("should format a large number with the plus sign when includeSign is true", () => {
    const result = formatIntoCurrency(1000000, true);
    expect(result).toBe("+$1,000,000.00");
  });
});

describe("formatIntoPercentDisplay", () => {
  it("should format a positive number without the plus sign when includeSign is omitted", () => {
    const result = formatIntoPercentDisplay(25);
    expect(result).toBe("25.00%");
  });

  it("should format a positive number without the plus sign when includeSign is false", () => {
    const result = formatIntoPercentDisplay(25, false);
    expect(result).toBe("25.00%");
  });

  it("should format a positive number with the plus sign when includeSign is true", () => {
    const result = formatIntoPercentDisplay(25, true);
    expect(result).toBe("+25.00%");
  });

  it("should format a negative number correctly without the sign", () => {
    const result = formatIntoPercentDisplay(-10);
    expect(result).toBe("-10.00%");
  });

  it("should format a negative number correctly when includeSign is true", () => {
    const result = formatIntoPercentDisplay(-10, true);
    expect(result).toBe("-10.00%"); // No change because negative numbers don't get a plus sign
  });

  it("should format zero without the plus sign", () => {
    const result = formatIntoPercentDisplay(0);
    expect(result).toBe("0.00%");
  });

  it("should format zero with the plus sign when includeSign is true", () => {
    const result = formatIntoPercentDisplay(0, true);
    expect(result).toBe("+0.00%");
  });

  it("should format a number with two decimal places", () => {
    const result = formatIntoPercentDisplay(12.34567);
    expect(result).toBe("12.35%"); // Rounds to two decimal places
  });

  it("should format a large number correctly", () => {
    const result = formatIntoPercentDisplay(12345.6789);
    expect(result).toBe("12345.68%"); // Rounds large numbers to two decimal places
  });

  it("should format a large number with the plus sign when includeSign is true", () => {
    const result = formatIntoPercentDisplay(12345.6789, true);
    expect(result).toBe("+12345.68%");
  });
});
