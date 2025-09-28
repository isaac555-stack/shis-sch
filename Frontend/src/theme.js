// src/theme.js
// Global design system: palette, typography, shape, and component defaults.
// This theme is consumed in App.jsx and extended with palette.mode for light/dark support.

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#3949ab", // Indigo tone used across the site
      light: "#5c6bc0",
      dark: "#283593",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ce93d8", // Accent tone used in CTAs
      light: "#f3c5ff",
      dark: "#9c64a6",
      contrastText: "#1a1a1a",
    },
  },

  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontFamily: `'Montserrat', sans-serif` },
    h2: { fontFamily: `'Montserrat', sans-serif` },
    h3: { fontFamily: `'Montserrat', sans-serif` },
    h4: { fontFamily: `'Montserrat', sans-serif` },
    h5: { fontFamily: `'Montserrat', sans-serif` },
    h6: { fontFamily: `'Montserrat', sans-serif` },
    button: { fontWeight: 600 },
  },
  components: {
    // Normalize base styles and add quality-of-life improvements
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        // Scrollbar styling (WebKit-based browsers)
        "::-webkit-scrollbar": {
          width: 10,
          height: 10,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#90A4AE",

          border: "2px solid transparent",
          backgroundClip: "content-box",
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        // Accessible focus ring for keyboard navigation
        ":focus-visible": {
          outline: "2px solid #3949ab",
          outlineOffset: 2,
        },
      },
    },

    // Buttons: remove caps, emphasize weight, consistent rounding and hover
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",

          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: "0 4px 12px rgba(57,73,171,0.25)",
          ":hover": {
            boxShadow: "0 6px 16px rgba(57,73,171,0.35)",
          },
        },
      },
    },

    // Cards: follow global shape radius for rounded corners with subtle hover
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          },
        },
      },
    },

    // Links: underline only on hover
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },

    // AppBar: flatter by default (content provides depth)
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

// Improve typography scaling across breakpoints
theme = responsiveFontSizes(theme);

export default theme;
