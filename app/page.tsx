"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { fetchTicker, fetchStockSnapshot } from "./services/polygon-api";
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
      const [tickerDetails, stockSnapshot] = await Promise.all([
        fetchTicker({ ticker: newTicker }),
        fetchStockSnapshot({ ticker: newTicker }),
      ]);
    } catch (err) {}
  }

  // async function handleAddTicker() {
  //   try {
  //     const tickerJson = await fetchTicker({ ticker: newTicker });
  //     if (tickerJson.results) {
  //       setTicker([...tickers, newTicker]);
  //       setStockData({ ...stockData, [newTicker]: tickerJson.results });
  //       setNewTicker("");
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch stock data", err);
  //   }
  // }

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
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const handleAddPortfolio = () => {
    if (newPortfolioName.trim() !== "") {
      setPortfolios([...portfolios, newPortfolioName]);
      setNewPortfolioName("");
      setDisplayModal(false);
    }
  };

  const handleOpenModal = () => {
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
    setNewPortfolioName("");
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
          <div className="level-item"></div>
          <div className="level-item">
            <Button
              icon="add"
              buttonText="Add Portfolio"
              handleClick={handleOpenModal}
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
      <div className={`modal ${displayModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title is-6">Add Portfolio</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleCloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Portfolio Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Portfolio Name"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                ></input>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-info" onClick={handleAddPortfolio}>
                Save changes
              </button>
              <button className="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
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
