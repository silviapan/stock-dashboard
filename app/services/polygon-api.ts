import { ApiError } from "next/dist/server/api-utils";

const apiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

export const fetchTicker = async ({ ticker }: { ticker: string }) => {
  const response = await fetch(
    `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`
  );
  const tickerDetails = await response.json();
  return tickerDetails;
};

export const fetchStockSnapshot = async ({ ticker }: { ticker: string }) => {
  const response = await fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`
  );
  const stockSnapshot = await response.json();
  return stockSnapshot;
};
