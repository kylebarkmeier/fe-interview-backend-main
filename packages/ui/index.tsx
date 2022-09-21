import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "services/store";
import ErrorFallback from "App/ErrorFallback";
import App from "App/index";
import reportWebVitals from "utils/reportWebVitals";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: "20px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
});
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
