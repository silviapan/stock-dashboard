import { ApiError } from "next/dist/server/api-utils";

const apiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

export const fetchTicker = async ({ ticker }: { ticker: string }) => {
  const response = await fetch(
    `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`
  );
  const tickerDetails = await response.json();
  return tickerDetails;
};

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createDummyData(ticker) {
  return {
    request_id: "657e430f1ae768891f018e08e03598d8",
    status: "OK",
    ticker: {
      day: {
        c: generateRandomNumber(0, 200),
        h: generateRandomNumber(0, 200),
        l: generateRandomNumber(0, 200),
        o: generateRandomNumber(0, 200),
        v: 28727868,
        vw: generateRandomNumber(0, 200),
      },
      lastQuote: {
        P: generateRandomNumber(0, 200),
        S: generateRandomInteger(1, 20),
        p: generateRandomNumber(0, 200),
        s: generateRandomInteger(1, 20),
        t: 1605195918507251700,
      },
      lastTrade: {
        c: [14, 41],
        i: "4046",
        p: generateRandomNumber(0, 200),
        s: generateRandomInteger(0, 1000),
        t: 1605195918306274000,
        x: 10,
      },
      min: {
        av: 28724441,
        c: 120.4201,
        h: 120.468,
        l: 120.37,
        n: 762,
        o: 120.435,
        t: 1684428720000,
        v: 270796,
        vw: 120.4129,
      },
      prevDay: {
        c: generateRandomNumber(0, 200),
        h: generateRandomNumber(0, 200),
        l: generateRandomNumber(0, 200),
        o: generateRandomNumber(0, 200),
        v: 110597265,
        vw: generateRandomNumber(0, 200),
      },
      ticker: ticker,
      todaysChange: generateRandomNumber(0, 1),
      todaysChangePerc: generateRandomNumber(0, 1),
      updated: 1605195918306274000,
    },
  };
}

const dummyData = {
  request_id: "657e430f1ae768891f018e08e03598d8",
  status: "OK",
  ticker: {
    day: {
      c: 120.4229,
      h: 120.53,
      l: 118.81,
      o: 119.62,
      v: 28727868,
      vw: 119.725,
    },
    lastQuote: {
      P: 120.47,
      S: 4,
      p: 120.46,
      s: 8,
      t: 1605195918507251700,
    },
    lastTrade: {
      c: [14, 41],
      i: "4046",
      p: 120.47,
      s: 236,
      t: 1605195918306274000,
      x: 10,
    },
    min: {
      av: 28724441,
      c: 120.4201,
      h: 120.468,
      l: 120.37,
      n: 762,
      o: 120.435,
      t: 1684428720000,
      v: 270796,
      vw: 120.4129,
    },
    prevDay: {
      c: 119.49,
      h: 119.63,
      l: 116.44,
      o: 117.19,
      v: 110597265,
      vw: 118.4998,
    },
    ticker: "AAPL",
    todaysChange: 0.98,
    todaysChangePerc: 0.82,
    updated: 1605195918306274000,
  },
};

export const fetchStockSnapshot = async ({ ticker }: { ticker: string }) => {
  const response = await fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`
  );
  const stockSnapshot = await response.json();
  return stockSnapshot;
};
