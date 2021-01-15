import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import "../App.scss";

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
