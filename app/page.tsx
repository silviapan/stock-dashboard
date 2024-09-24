"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { fetchTicker, fetchStockSnapshot } from "./services/polygon-api";
import { Button } from "./components/button";
import { LabeledText } from "./components/text";

function Ticker({ stockData, handleRemoveTicker }) {
  const currentPrice = stockData.snapshot.day.c;
  const yesterdayClose = stockData.snapshot.prevDay.c;
  const todayChange = stockData.snapshot.todaysChange;
  const todayChangePercent = stockData.snapshot.todaysChangePerc;

  const todayLow = stockData.snapshot.day.l;
  const todayHigh = stockData.snapshot.day.h;
  const todayRange = `${formatIntoCurrency(todayLow)} - ${formatIntoCurrency(
    todayHigh
  )}`;

  function formatIntoCurrency(num: number, includeSign?: boolean) {
    let formattedNum = num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    if (num >= 0 && includeSign) {
      formattedNum = `+${formattedNum}`;
    }
    return formattedNum;
  }

  function formatIntoPercentDisplay(num: number, includeSign?: boolean) {
    let formattedNum = `${num.toFixed(2)}%`;
    if (num >= 0 && includeSign) {
      formattedNum = `+${formattedNum}`;
    }
    return formattedNum;
  }

  const todayChangePositive = todayChange >= 0;

  return (
    <div className="py-3" style={{ borderTop: "1px solid lightgrey" }}>
      <nav className="level mb-3 is-flex-direction-row is-flex-wrap-wrap">
        <div
          className="level-left is-flex-direction-row is-flex-wrap-wrap"
          style={{ maxWidth: "90%" }}
        >
          <span>{stockData.name}</span>
          <span
            className={`tag is-medium is-light ${
              todayChangePositive ? "is-success" : "is-danger"
            }`}
          >
            {formatIntoPercentDisplay(todayChangePercent)}
          </span>
          <span
            className={`${
              todayChangePositive ? "has-text-success" : "has-text-danger"
            }`}
          >
            {formatIntoCurrency(todayChange, true)}
          </span>
        </div>
        <div className="level-right">
          <Button
            icon="delete"
            buttonText=""
            handleClick={handleRemoveTicker}
            buttonStyleClasses={["is-small", "is-rounded"]}
          />
        </div>
      </nav>

      <div className="columns">
        <div className="column is-2">
          <LabeledText label="Symbol" text={stockData.ticker} />
        </div>
        <div className="column">
          <LabeledText
            label="Current Price"
            text={formatIntoCurrency(currentPrice)}
          />
        </div>
        <div className="column">
          <LabeledText
            label="Yesterday Close"
            text={formatIntoCurrency(yesterdayClose)}
          />
        </div>
        <div className="column">
          <LabeledText label="Day Range" text={todayRange} />
        </div>
      </div>
    </div>
  );
}

function TickerList() {
  const [tickers, setTicker] = useState<string[]>([]);
  const [stockData, setStockData] = useState<{ [key: string]: any }>({});
  const [newTicker, setNewTicker] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  function handleInputNewTicker(e) {
    setNewTicker(e.target.value.toUpperCase());
    setRequestError("");
  }

  async function handleAddTicker() {
    if (newTicker === "") return;

    // Ticker already exists so don't make request
    if (stockData[newTicker]) {
      setRequestError(
        `Stock with ticker ${newTicker} has already been added to the portfolio.`
      );
    } else {
      try {
        const [tickerDetails, stockSnapshot] = await Promise.all([
          fetchTicker({ ticker: newTicker }),
          fetchStockSnapshot({ ticker: newTicker }),
        ]);

        if (tickerDetails.status === "NOT_FOUND") {
          setRequestError(
            `Stock with ticker '${newTicker}' can't be found. Please try searching for another stock.`
          );
        } else if (stockSnapshot.status === "NOT_AUTHORIZED") {
          setRequestError(
            `Please upgrade your plan to view stock data about ${newTicker}.`
          );
        }

        if (tickerDetails.results && stockSnapshot.ticker) {
          setTicker([...tickers, newTicker]);
          setStockData({
            ...stockData,
            [newTicker]: {
              ...tickerDetails.results,
              snapshot: stockSnapshot.ticker,
            },
          });
          setNewTicker("");
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        setRequestError(
          `There was an error getting details about ${newTicker}. Please try again.`
        );
      }
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
      <div className="field has-addons">
        <div className="control">
          <input
            className="input is-small is-dark"
            type="text"
            placeholder="Add new ticker to the portfolio"
            value={newTicker}
            onChange={(e) => handleInputNewTicker(e)}
          ></input>
        </div>
        <div className="control">
          <Button
            buttonText="Add Stock"
            handleClick={handleAddTicker}
            buttonStyleClasses={["is-small", "is-dark", "is-outlined"]}
          />
        </div>
      </div>
      {requestError.length > 0 && (
        <p className="help has-text-danger">{requestError}</p>
      )}
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
    </div>
  );
}

function Portfolio({ portfolio }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <p className="subtitle">{portfolio}</p>
          <TickerList portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}

function PortfolioList() {
  const [portfolios, setPortfolios] = useState<string[]>([]);
  const [newPortfolioName, setNewPortfolioName] = useState<string>("");
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string>("");

  const handleAddPortfolio = () => {
    const portfolioNames = new Set(portfolios);

    if (newPortfolioName.trim() !== "") {
      if (portfolioNames.has(newPortfolioName)) {
        setRequestError(
          `Portfolio with name ${newPortfolioName} already exists. Please choose another name.`
        );
      } else {
        setPortfolios([...portfolios, newPortfolioName]);
        setNewPortfolioName("");
        setDisplayModal(false);
        setRequestError("");
      }
    }
  };

  const handleOpenModal = () => {
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
    setNewPortfolioName("");
    setRequestError("");
  };

  return (
    <div>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="is-size-3 has-text-weight-semibold">
              Silvia Pan's Portfolios
            </h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item"></div>
          <div className="level-item">
            <Button
              icon="add"
              buttonText="Add Portfolio"
              handleClick={handleOpenModal}
              buttonStyleClasses={["is-dark"]}
            />
          </div>
        </div>
      </nav>
      {portfolios && portfolios.length ? (
        <div className="columns is-flex-wrap-wrap">
          {portfolios.map((portfolio) => (
            <div
              className="column is-half-desktop is-full-tablet"
              key={portfolio}
            >
              <Portfolio portfolio={portfolio} />
            </div>
          ))}
        </div>
      ) : (
        <div className="notification">
          <p>
            There are currently no portfolios. Add a new portfolio to start
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
                  placeholder="Name New Portfolio"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                ></input>
              </div>
            </div>
            {requestError.length > 0 && (
              <p className="help is-danger">{requestError}</p>
            )}
          </section>
          <footer className="modal-card-foot is-justify-content-center">
            <div className="buttons">
              <Button
                handleClick={handleAddPortfolio}
                buttonStyleClasses={["is-dark"]}
                buttonText="Save Changes"
              />
              <Button handleClick={handleCloseModal} buttonText="Cancel" />
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
