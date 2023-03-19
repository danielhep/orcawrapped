import "../styles/globals.css";
// eslint-disable-next-line camelcase
import "@fontsource/open-sans/variable.css";
import "@fontsource/arvo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useLocalStorageState from "use-local-storage-state";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

import { UnprocessedOrcaCard } from "../src/types";
import { AppContext, defaultAppState } from "../src/components/AppContext";
import RainBackground from "../src/components/RainBackground";
import { generateAppState } from "../src/processing_utils/processingUtils";

Bugsnag.start({
  apiKey: "04e95878207d41d2da7c5d058cc3e3be",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React);

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "Helvetica"].join(","),
  },
});

function MyApp({ Component, pageProps }): JSX.Element {
  const [unprocessedOrcaCards, setUnprocessedOrcaCards] =
    useLocalStorageState<UnprocessedOrcaCard[]>("orcaCsv");

  const appState = unprocessedOrcaCards
    ? generateAppState(unprocessedOrcaCards)
    : defaultAppState;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          zIndex: 2,
        }}
      >
        <ThemeProvider theme={theme}>
          <AppContext.Provider value={[appState, setUnprocessedOrcaCards]}>
            {ErrorBoundary ? (
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            ) : (
              <Component {...pageProps} />
            )}
          </AppContext.Provider>
        </ThemeProvider>
      </div>
      <RainBackground />
    </>
  );
}

export default MyApp;
