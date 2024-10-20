import { LabeledText } from "../../components/ui/text";
import {
  IconButton,
  Box,
  Typography,
  Stack,
  Grid2 as Grid,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  formatIntoCurrency,
  formatIntoPercentDisplay,
} from "../../utils/stockDisplayUtils";

interface SnapshotData {
  day: {
    c: number; // current price
    l: number; // low price
    h: number; // high price
  };
  prevDay: {
    c: number; // close price of the previous day
  };
  todaysChange: number;
  todaysChangePerc: number;
}

interface StockData {
  ticker: string;
  name: string;
  snapshot: SnapshotData;
}

interface StockSnapshotProps {
  stockData: StockData;
  handleRemoveTicker: () => void;
}

export function StockSnapshot({
  stockData,
  handleRemoveTicker,
}: StockSnapshotProps) {
  const defaultStockData: StockData = {
    ticker: "N/A",
    name: "Unknown",
    snapshot: {
      day: { c: 0, l: 0, h: 0 },
      prevDay: { c: 0 },
      todaysChange: 0,
      todaysChangePerc: 0,
    },
  };

  let effectiveStockData = stockData;
  const stockDataEmpty = Object.keys(stockData).length === 0;

  if (!stockData || !stockData.snapshot || stockDataEmpty) {
    effectiveStockData = defaultStockData;
  }
  const snapshotData = effectiveStockData.snapshot;
  const currentPrice = snapshotData.day.c;
  const yesterdayClose = snapshotData.prevDay.c;
  const todayChange = snapshotData.todaysChange;
  const todayChangePercent = snapshotData.todaysChangePerc;

  const todayLow = snapshotData.day.l;
  const todayHigh = snapshotData.day.h;
  const todayRange = `${formatIntoCurrency(todayLow)} - ${formatIntoCurrency(
    todayHigh
  )}`;

  const todayChangePositive = todayChange >= 0;

  const stockDataDisplay = [
    { label: "Symbol", text: effectiveStockData.ticker },
    { label: "Current Price", text: formatIntoCurrency(currentPrice) },
    { label: "Yesterday Close", text: formatIntoCurrency(yesterdayClose) },
    { label: "Day Range", text: todayRange },
  ];

  return (
    <Box pb={1} pt={1}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Typography>{effectiveStockData.name}</Typography>
          <Chip
            color={`${todayChangePositive ? "success" : "error"}`}
            label={formatIntoPercentDisplay(todayChangePercent)}
            size="small"
            sx={{ borderRadius: "8px" }}
          ></Chip>
          <Typography color={`${todayChangePositive ? "success" : "error"}`}>
            {formatIntoCurrency(todayChange, true)}
          </Typography>
        </Stack>
        <IconButton onClick={handleRemoveTicker} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>

      <Grid container spacing={5}>
        {stockDataDisplay.map((data) => (
          <Grid size="auto" key={data.label}>
            <LabeledText label={data.label} text={data.text} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
