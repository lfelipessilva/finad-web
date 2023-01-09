import React from 'react'
import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'

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

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
