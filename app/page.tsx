"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { fetchTicker } from "./services/polygon-api";
import { Button } from "./components/button";

function Ticker({ stockData, handleRemoveTicker }) {
  return (
    <div className="columns">
      <div className="column">
        <p>{stockData.name}</p>
      </div>
      <div className="column">
        <Button
          icon="delete"
          buttonText="Remove"
          handleClick={handleRemoveTicker}
        />
      </div>
    </div>
  );
}

function TickerList() {
  const [tickers, setTicker] = useState<string[]>([]);
  const [stockData, setStockData] = useState<{ [key: string]: any }>({});
  const [newTicker, setNewTicker] = useState<string>("");

  async function handleAddTicker() {
    try {
      const tickerData = await fetchTicker({ ticker: newTicker });
      const tickerJson = await tickerData.json();
      if (tickerJson.results) {
        setTicker([...tickers, newTicker]);
        setStockData({ ...stockData, [newTicker]: tickerJson.results });
        setNewTicker("");
      }
    } catch (err) {
      console.error("Failed to fetch stock data", err);
    }
  }

  function handleRemoveTicker(selectedTicker: string) {
    setTicker(tickers.filter((t) => t !== selectedTicker));
    setStockData((data) => {
      const copy = { ...data };
      delete copy[selectedTicker];
      return copy;
    });
  }

  return (
    <div>
      {tickers.length > 0 &&
        tickers.map((ticker) => {
          return (
            <>
              <Ticker
                key={ticker}
                stockData={stockData[ticker]}
                handleRemoveTicker={() => handleRemoveTicker(ticker)}
              />
            </>
          );
        })}
      <nav className="level">
        <div className="level-right">
          <div className="level-item">
            <input
              className="input"
              type="text"
              placeholder="Add new ticker to the portfolio"
              value={newTicker}
              onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
            ></input>
          </div>
          <div className="level-item">
            <Button buttonText="Add Stock" handleClick={handleAddTicker} />
          </div>
        </div>
      </nav>
    </div>
  );
}

function Portfolio({ portfolio }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <p className="subtitle">{portfolio}</p>
          <TickerList />
        </div>
      </div>
    </div>
  );
}

function PortfolioList() {
  const [portfolios, setPortfolios] = useState<string[]>([]);
  const [newPortfolioName, setNewPortfolioName] = useState<string>("");

  const handleAddPortfolio = () => {
    if (newPortfolioName.trim() !== "") {
      setPortfolios([...portfolios, newPortfolioName]);
      setNewPortfolioName("");
    }
  };

  return (
    <div>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title">Silvia Pan's Portfolios</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <input
              className="input"
              type="text"
              placeholder="Add new portfolio to the dashboard"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
            ></input>
          </div>
          <div className="level-item">
            <Button
              icon="add"
              buttonText="Add Portfolio"
              handleClick={handleAddPortfolio}
            />
          </div>
        </div>
      </nav>

      {portfolios && portfolios.length ? (
        <div className="columns is-flex-wrap-wrap">
          {portfolios.map((portfolio) => (
            <div className="column is-half" key={portfolio}>
              <Portfolio portfolio={portfolio} />
            </div>
          ))}
        </div>
      ) : (
        <div className="notification">
          <p>
            There are currently no portfolios. Add a new porfolitio to start
            organizing your stocks.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <PortfolioList />
    </div>
  );
}
