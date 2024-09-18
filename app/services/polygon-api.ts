export const fetchTicker = async ({ ticker }: { ticker: string }) => {
  const tickerDetails = await fetch(
    `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=kqoXdydxPUD7CoNWKEHtoFJ3SydqGMWn`
  );

  return tickerDetails;
};
