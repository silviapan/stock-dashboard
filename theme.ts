"use client";
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: `${inter.style.fontFamily}, Helvetica, Arial, sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: "3rem",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          variants: [
            {
              style: { backgroundColor: "rgba(0,0,0,0.8)" },
            },
          ],
        },
      },
    },
  },
});

export default theme;
