import '../styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
