import { AppProps } from 'next/app'

import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
    background: #4c4c4c;
    color: #f0f0f0;
    font-family: proxima-nova, sans-serif
  }
`;

const theme = {
  colors: {
    primary: "#806060",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
