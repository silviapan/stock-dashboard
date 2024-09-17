"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

function TickerTable() {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Most Recent Price</th>
          <th>Compared to Yesterday</th>
        </tr>
      </thead>
    </table>
  );
}

function Ticker() {
  return (
    <div>
      <p>Ticker</p>
    </div>
  );
}

function Portfolio({ portfolio }) {
  const [tickers, setTickers] = useState<string[]>([]);
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <p className="subtitle">{portfolio}</p>
          <TickerTable />
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
            <button className="button is-link" onClick={handleAddPortfolio}>
              Add Portfolio
            </button>
          </div>
        </div>
      </nav>

      {portfolios && portfolios.length && (
        <div className="columns is-flex-wrap-wrap">
          {portfolios.map((portfolio) => (
            <div className="column is-one-third">
              <Portfolio portfolio={portfolio} />
            </div>
          ))}
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
