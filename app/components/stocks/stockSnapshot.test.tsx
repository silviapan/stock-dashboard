import { render, screen, fireEvent } from "@testing-library/react";
import { StockSnapshot } from "./stockSnapshot";
import {
  formatIntoCurrency,
  formatIntoPercentDisplay,
} from "../../utils/stockDisplayUtils";

jest.mock("../../utils/stockDisplayUtils");

describe("StockSnapshot", () => {
  const mockHandleRemoveTicker = jest.fn();

  const stockData = {
    ticker: "AMC",
    name: "AMC ENTERTAINMENT HOLDINGS, INC.",
    market: "stocks",
    locale: "us",
    primary_exchange: "XNYS",
    type: "CS",
    active: true,
    currency_name: "usd",
    cik: "0001411579",
    composite_figi: "BBG000TDCVT6",
    share_class_figi: "BBG001SZYYL4",
    market_cap: 1.5755076038000002e9,
    phone_number: "913-213-2000",
    address: {
      address1: "ONE AMC WAY",
      address2: "11500 ASH STREET",
      city: "LEAWOOD",
      state: "KS",
      postal_code: "66211",
    },
    description:
      "AMC Entertainment Holdings Inc is involved in the theatrical exhibition business. It owns, operates or has interests in theatres located in the United States and Europe. It provides amenities such as plush, power recliners, MacGuffins full bars, AMC Dine-In Theatres, premium presentation. The Company has identified two reportable segments and reporting units for its theatrical exhibition operations, U.S. markets and International markets. It derives key revenue from the U.S.",
    sic_code: "7830",
    sic_description: "SERVICES-MOTION PICTURE THEATERS",
    ticker_root: "AMC",
    homepage_url: "https://www.amctheatres.com",
    total_employees: 33812,
    list_date: "2013-12-18",
    branding: {
      logo_url:
        "https://api.polygon.io/v1/reference/company-branding/YW1jdGhlYXRyZXMuY29t/images/2024-10-01_logo.svg",
      icon_url:
        "https://api.polygon.io/v1/reference/company-branding/YW1jdGhlYXRyZXMuY29t/images/2024-10-01_icon.jpeg",
    },
    share_class_shares_outstanding: 372450000,
    weighted_shares_outstanding: 361354955,
    round_lot: 100,
    snapshot: {
      ticker: "AMC",
      todaysChangePerc: 3.31753554502371,
      todaysChange: 0.14000000000000057,
      updated: 1729296000000000000,
      day: { o: 4.23, h: 4.37, l: 4.23, c: 4.36, v: 5.491446e6, vw: 4.3013 },
      min: {
        av: 5.491446e6,
        t: 1729295940000,
        n: 8,
        o: 4.3501,
        h: 4.36,
        l: 4.3501,
        c: 4.36,
        v: 610,
        vw: 4.3583,
      },
      prevDay: {
        o: 4.2,
        h: 4.24,
        l: 4.1512,
        c: 4.22,
        v: 4.063983e6,
        vw: 4.2001,
      },
    },
  };

  beforeEach(() => {
    mockHandleRemoveTicker.mockClear();
    (formatIntoCurrency as jest.Mock)
      .mockImplementationOnce(() => "$4.36") // Current price
      .mockImplementationOnce(() => "$4.22") // Yesterday's close
      .mockImplementationOnce(() => "$4.23") // Day low
      .mockImplementationOnce(() => "$4.37"); // Day high
    (formatIntoPercentDisplay as jest.Mock).mockReturnValue("+3.32%");
  });

  it("should render the stock and snapshot data", () => {
    render(
      <StockSnapshot
        stockData={stockData}
        handleRemoveTicker={mockHandleRemoveTicker}
      />
    );
    // Check the stock name and ticker
    expect(
      screen.getByText("AMC ENTERTAINMENT HOLDINGS, INC.")
    ).toBeInTheDocument();
    expect(screen.getByText("AMC")).toBeInTheDocument();

    // Check that the current price is rendered
    expect(screen.getByText(/\$4\.36/i)).toBeInTheDocument();

    // Check that yesterday's close is rendered
    expect(screen.getByText(/\$4\.22/i)).toBeInTheDocument();

    // Check that the day range is rendered
    expect(screen.getByText(/\$4\.23/i)).toBeInTheDocument();
    expect(screen.getByText(/\$4\.37/i)).toBeInTheDocument();
  });

  it("should render a success color for positive stock change", () => {
    render(
      <StockSnapshot
        stockData={stockData}
        handleRemoveTicker={mockHandleRemoveTicker}
      />
    );

    // Check that the percentage change chip is rendered with the success color
    const chipText = screen.getByText("+3.32%");
    const chipContainer = chipText.closest(".MuiChip-root");
    expect(chipContainer).toHaveClass("MuiChip-colorSuccess");
  });

  it("should render an error color for negative stock change", () => {
    const negativeStockData = {
      ...stockData,
      snapshot: {
        ...stockData.snapshot,
        todaysChange: -2,
        todaysChangePerc: -1.35,
      },
    };

    (formatIntoPercentDisplay as jest.Mock).mockReturnValue("-1.35%");

    render(
      <StockSnapshot
        stockData={negativeStockData}
        handleRemoveTicker={mockHandleRemoveTicker}
      />
    );

    // Check that the percentage change chip is rendered with the error color
    const chipText = screen.getByText("-1.35%");
    const chipContainer = chipText.closest(".MuiChip-root");
    expect(chipContainer).toHaveClass("MuiChip-colorError");
  });

  it("should call handleRemoveTicker when the delete button is clicked", () => {
    const { container } = render(
      <StockSnapshot
        stockData={stockData}
        handleRemoveTicker={mockHandleRemoveTicker}
      />
    );

    // Find the delete button (icon button role with accessible name 'delete')
    const deleteButton = container.querySelector('button[aria-label="delete"]');
    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(mockHandleRemoveTicker).toHaveBeenCalledTimes(1);
    } else {
      throw new Error("Delete button not found");
    }
  });

  it("should render default stock data when passed an empty object", () => {
    render(
      <StockSnapshot
        stockData={{} as any} // Simulate passing an empty object
        handleRemoveTicker={mockHandleRemoveTicker}
      />
    );

    // Check that the default values are rendered
    expect(screen.getByText("Unknown")).toBeInTheDocument(); // Default name
    expect(screen.getByText("N/A")).toBeInTheDocument(); // Default ticker
  });
});
