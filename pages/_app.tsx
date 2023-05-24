import "../styles/globals.css";
// eslint-disable-next-line camelcase
import "@fontsource/open-sans/variable.css";
import "@fontsource/arvo";
import "@fontsource/ibm-plex-serif";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useLocalStorageState from "use-local-storage-state";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";
import useDarkMode from "use-dark-mode";

import { UnprocessedOrcaCard } from "../src/types";
import { AppContext, defaultAppState } from "../src/components/AppContext";
import { generateAppState } from "../src/processing_utils/processingUtils";
import TopBarButtons from "../src/components/TopBarButtons";
import Footer from "../src/components/Footer";

Bugsnag.start({
  apiKey: "04e95878207d41d2da7c5d058cc3e3be",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React);

declare module "@mui/material/styles" {
  interface Theme {
    fonts: {
      titleFont: string;
    };
  }
  interface ThemeOptions {
    fonts?: {
      titleFont?: string;
    };
  }

  interface PaletteOptions {
    backgroundSecondary: string;
    brightText: string;
  }
  interface Palette {
    backgroundSecondary: string;
    brightText: string;
  }
}

function MyApp({ Component, pageProps }): JSX.Element {
  const { value: darkModeEnabled } = useDarkMode();
  const [unprocessedOrcaCards, setUnprocessedOrcaCards] =
    useLocalStorageState<UnprocessedOrcaCard[]>("orcaCsv");

  const appState = unprocessedOrcaCards
    ? generateAppState(unprocessedOrcaCards)
    : defaultAppState;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkModeEnabled ? "dark" : "light",
          backgroundSecondary: darkModeEnabled ? "#4A4F5F" : "#E1F0F1",
          brightText: "#E68F40",
        },
        typography: {
          fontFamily: ["Open Sans", "Helvetica"].join(","),
          h4: {
            fontSize: 34,
            fontWeight: 600,
            fontFamily: ["Open Sans", "Helvetica"].join(","),
          },
          h3: {
            fontSize: 38,
            fontWeight: 700,
            fontFamily: ["IBM Plex Serif", "serif"].join(","),
          },
          h2: {
            fontSize: 36,
            fontWeight: 700,
            fontFamily: ["IBM Plex Serif", "serif"].join(","),
          },
        },
        fonts: {
          titleFont: ["IBM Plex Serif", "serif"].join(","),
        },
      }),
    [darkModeEnabled]
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          zIndex: 2,
          background: theme.palette.backgroundSecondary,
        }}
      >
        <ThemeProvider theme={theme}>
          <AppContext.Provider value={[appState, setUnprocessedOrcaCards]}>
            {ErrorBoundary ? (
              <ErrorBoundary>
                <TopBarButtons />
                <Component {...pageProps} />
                <Footer />
              </ErrorBoundary>
            ) : (
              <Component {...pageProps} />
            )}
          </AppContext.Provider>
        </ThemeProvider>
      </div>
      {/* <RainBackground /> */}
    </>
  );
}

export default MyApp;
