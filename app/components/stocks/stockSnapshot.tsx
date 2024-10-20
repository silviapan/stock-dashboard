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

interface TickerProps {
  stockData: StockData;
  handleRemoveTicker: () => void;
}

export function StockSnapshot({ stockData, handleRemoveTicker }: TickerProps) {
  const snapshotData = stockData.snapshot;
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
    { label: "Symbol", text: stockData.ticker },
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
        </Stack>
        <IconButton onClick={handleRemoveTicker}>
          <DeleteIcon />
        </IconButton>
      </Box>

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
