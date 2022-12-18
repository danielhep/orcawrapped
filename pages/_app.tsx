import '../styles/globals.css'
// eslint-disable-next-line camelcase
import { Roboto_Flex } from '@next/font/google'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppContext, AppState } from '../src/components/AppContext'
import { useLocalStorageState } from 'ahooks'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--roboto-flex' })

const theme = createTheme({
  typography: {
    fontFamily: [
      'var(--roboto-flex)',
      'Helvetica'
    ].join(',')
  }
})

function MyApp ({ Component, pageProps }): JSX.Element {
  const [appState, setAppState] = useLocalStorageState<AppState>('appState')
  return (
    <div
      className={roboto.variable} style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto'
      }}
    >
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={[appState, setAppState]}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  )
}

export default MyApp
