export const fetchTicker = async ({ ticker }: { ticker: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
  const tickerDetails = await fetch(
    `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`
  );

  return tickerDetails;
};
