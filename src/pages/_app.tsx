import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
   html { 
   font-family: Open sans, sans-serif;

      body {
      margin: 0;
      }
      
      p {
      margin: 0;
      }
   }
`;

const theme = {
  primary: "#367EFF",
  secondary: "#BC5AE6"
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
