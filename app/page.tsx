"use client";

import React, { useState } from "react";
import { fetchTicker, fetchStockSnapshot } from "./services/polygon-api";
import {
  Container,
  Button,
  IconButton,
  Box,
  Typography,
  Stack,
  Grid2 as Grid,
  Alert,
  Paper,
  InputBase,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "./components/ui/textInput";
import { CardModal } from "./components/ui/cardModal";
import { StockSnapshot } from "./components/stocks/stockSnapshot";

function TickerList() {
  const [tickers, setTicker] = useState<string[]>([]);
  const [stockData, setStockData] = useState<{ [key: string]: any }>({});
  const [newTicker, setNewTicker] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  function handleInputNewTicker(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTicker(event.target.value.toUpperCase());
    setRequestError("");
  }

  async function handleAddTicker() {
    if (newTicker === "") return;

    // Ticker already exists so don't make request
    if (stockData[newTicker]) {
      setRequestError(
        `Stock with ticker ${newTicker} has already been added to the portfolio.`
      );
      return;
    }

    try {
      const [tickerDetails, stockSnapshot] = await Promise.all([
        fetchTicker({ ticker: newTicker }),
        fetchStockSnapshot({ ticker: newTicker }),
      ]);

      if (tickerDetails.status === "NOT_FOUND") {
        setRequestError(
          `Stock with ticker '${newTicker}' can't be found. Please try searching for another stock.`
        );
        return;
      } else if (stockSnapshot.status === "NOT_AUTHORIZED") {
        setRequestError(
          `Please upgrade your plan to view stock data about ${newTicker}.`
        );
        return;
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
        setRequestError("");
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setRequestError(
        `There was an error getting details about ${newTicker}. Please try again.`
      );
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
    <Box>
      <Box mb={2}>
        <Paper
          component="form"
          variant="outlined"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            size="small"
            placeholder="Enter Ticker Symbol"
            value={newTicker}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputNewTicker(event);
            }}
          />
          <IconButton type="button" aria-label="Add" onClick={handleAddTicker}>
            <AddIcon />
          </IconButton>
        </Paper>

        {requestError.length > 0 && (
          <Alert severity="error">{requestError}</Alert>
        )}
      </Box>
      {tickers.length > 0 &&
        tickers.map((ticker) => {
          return (
            <Box key={ticker}>
              <Divider />
              <StockSnapshot
                key={ticker}
                stockData={stockData[ticker]}
                handleRemoveTicker={() => handleRemoveTicker(ticker)}
              />
            </Box>
          );
        })}
    </Box>
  );
}

interface PortfolioProps {
  portfolio: string;
}

function Portfolio({ portfolio }: PortfolioProps) {
  return (
    <Paper elevation={2} sx={{ px: 3, py: 2 }}>
      <Typography variant="h6" pb={1}>
        {portfolio}
      </Typography>
      <TickerList />
    </Paper>
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

  const handleInputPortfolioName = (value: string) => {
    setNewPortfolioName(value);
  };

  return (
    <Box>
      <Stack
        direction="row"
        pb={2}
        sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <Typography variant="h5" component="h2">
          Silvia Pan's Portfolios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          color="black"
        >
          Add Portfolio
        </Button>
      </Stack>
      {portfolios && portfolios.length ? (
        <Grid container spacing={2}>
          {portfolios.map((portfolio) => (
            <Grid size={{ md: 12, lg: 6 }} key={portfolio}>
              <Portfolio portfolio={portfolio} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">
          There are currently no portfolios. Add a new portfolio to start
          organizing your stocks.
        </Alert>
      )}
      <CardModal
        displayModal={displayModal}
        handleCloseModal={handleCloseModal}
        cardTitle="Add Portfolio"
        handleSave={handleAddPortfolio}
      >
        <TextInput
          label="Portfolio Name"
          value={newPortfolioName}
          helperText={requestError}
          required={true}
          onInputChange={handleInputPortfolioName}
        />
      </CardModal>
    </Box>
  );
}

export default function Home() {
  return (
    <Container>
      <PortfolioList />
    </Container>
  );
}
