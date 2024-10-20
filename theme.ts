"use client";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"]; // Extend Palette to include 'violet'
  }

  interface PaletteOptions {
    black?: PaletteOptions["primary"]; // Extend PaletteOptions to include 'violet'
  }
}

// Extend the theme to include the custom color
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    black: true; // Add custom 'black' color
  }
}

const blackBase = "#000";
const blackMain = alpha(blackBase, 0.9);

const theme = createTheme({
  palette: {
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
  typography: {
    fontFamily: `${inter.style.fontFamily}, Helvetica, Arial, sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#eeedeb",
          padding: "3rem",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.9)", // Set backdrop color with 90% opacity
        },
      },
    },
  },
});

export default theme;
