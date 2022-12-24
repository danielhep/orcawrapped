import "../styles/globals.css";
// eslint-disable-next-line camelcase
import { Roboto_Flex } from "@next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "../src/components/AppContext";
import useLocalStorageState from "use-local-storage-state";
import { AppState } from "../src/types";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--roboto-flex" });

const theme = createTheme({
  typography: {
    fontFamily: ["var(--roboto-flex)", "Helvetica"].join(","),
  },
});

function MyApp({ Component, pageProps }): JSX.Element {
  const [appState, setAppState] = useLocalStorageState<AppState>("appState");
  const setWithConsole = (state: AppState) => {
    console.log(JSON.stringify(state));
    setAppState(state);
  };
  return (
    <div
      className={roboto.variable}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        background: "black",
      }}
    >
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={[appState, setWithConsole]}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
