"use client";

import { useState, useEffect } from "react";
import { fetchTicker, fetchStockSnapshot } from "./services/polygon-api";
import { LabeledText } from "./components/ui/text";
import {
  Container,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Grid2 as Grid,
  Card,
  CardContent,
  Alert,
  Paper,
  InputBase,
  Divider,
  Chip,
} from "@mui/material";

import { TextInput } from "./components/ui/textInput";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const stockDataDisplay = [
    { label: "Symbol", text: stockData.ticker },
    { label: "Current Price", text: formatIntoCurrency(currentPrice) },
    { label: "Yesterday Close", text: formatIntoCurrency(yesterdayClose) },
    { label: "Day Range", text: todayRange },
  ];

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Typography>{stockData.name}</Typography>
        <Chip
          color={`${todayChangePositive ? "success" : "error"}`}
          label={formatIntoPercentDisplay(todayChangePercent)}
          size="small"
          sx={{ borderRadius: "8px" }}
        ></Chip>
        <Typography color={`${todayChangePositive ? "success" : "error"}`}>
          {formatIntoCurrency(todayChange, true)}
        </Typography>
        <IconButton onClick={handleRemoveTicker}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Grid container spacing={5}>
        {stockDataDisplay.map((data) => (
          <Grid size="auto">
            <LabeledText label={data.label} text={data.text} />
          </Grid>
        ))}
      </Grid>
    </Box>
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
    <Box>
      <Paper
        component="form"
        variant="outlined"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
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
      {tickers.length > 0 &&
        tickers.map((ticker) => {
          return (
            <>
              <Divider />
              <Ticker
                key={ticker}
                stockData={stockData[ticker]}
                handleRemoveTicker={() => handleRemoveTicker(ticker)}
              />
            </>
          );
        })}
    </Box>
  );
}

function Portfolio({ portfolio }) {
  return (
    <Paper elevation={2}>
      <Typography variant="h6">{portfolio}</Typography>
      <TickerList portfolio={portfolio} />
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <Typography variant="h5" component="h2">
          Silvia Pan's Portfolios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
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
      <Modal
        open={displayModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add Portfolio
          </Typography>
          <TextInput
            label="Portfolio Name"
            value={newPortfolioName}
            helperText={requestError}
            required={true}
            onInputChange={handleInputPortfolioName}
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleAddPortfolio}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
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
