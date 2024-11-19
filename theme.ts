import { createTheme } from "@mui/material/styles";
import Iranyekanbold from "./src/assets/Fonts/iranyekan/Iranyekanbold.ttf";
import Iranyekanextrabold from "./src/assets/Fonts/iranyekan/Iranyekanextrabold.ttf";
import Iranyekanlight from "./src/assets/Fonts/iranyekan/Iranyekanlight.ttf";
import Iranyekanmedium from "./src/assets/Fonts/iranyekan/Iranyekanmedium.ttf";
import Iranyekanthin from "./src/assets/Fonts/iranyekan/Iranyekanthin.ttf";
import { red } from "@mui/material/colors";

// Define an array of fonts
export const fontFamilies = {
  bold: "YekanBold",
  extraBold: "YekanExtraBold",
  light: "YekanLight",
  medium: "YekanMedium",
  thin: "YekanThin",
};

// MUI theme
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: `${fontFamilies.medium}, Arial`, // Default font is medium
  },
  palette: {
    mode: "light",
    primary: {
      main: "#257180",
      light: "#3092a6",
      dark: "#1e5a66",
      contrastText: "#F4F6FF",
    },
    secondary: {
      main: "#CB6040",
      light: "#FD8B51",
      contrastText: "#F4F6FF",
    },
    success: {
      main: "#4caf50", // Green color for success
      contrastText: "#ffffff", // White text
    },
    warning: {
      main: "#ff9800", // Orange color for warning
      contrastText: "#ffffff",
    },
    error: {
      main: red[600], // Red color for error
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: '${fontFamilies.medium}';
          src: url(${Iranyekanmedium}) format('woff2');
        }
        @font-face {
          font-family: '${fontFamilies.bold}';
          src: url(${Iranyekanbold}) format('woff2');
        }
        @font-face {
          font-family: '${fontFamilies.light}';
          src: url(${Iranyekanlight}) format('woff2');
        }
        @font-face {
          font-family: '${fontFamilies.thin}';
          src: url(${Iranyekanthin}) format('woff2');
        }
        @font-face {
          font-family: '${fontFamilies.extraBold}';
          src: url(${Iranyekanextrabold}) format('woff2');
        }
        a {
          text-decoration: none;
          color: inherit;
        }
      `,
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#4caf50", // Default green background
          color: "#ffffff", // White text
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#4caf50", // Default green background
          color: "#ffffff", // White text
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners
          padding: "8px 16px", // Spacing
        },
        icon: {
          color: "#ffffff", // White color for icons
        },
        standardError: {
          color: "#fff5f5", // Light red background for standard error
          backgroundColor: red[600], // Text color
        },
        standardSuccess: {
          color: "#ffffff", // White text for standard success
          backgroundColor: "#4caf50", // Green background for standard success
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Default title color
          fontWeight: "bold", // Bold titles
        },
      },
    },
  },
});

export default theme;
