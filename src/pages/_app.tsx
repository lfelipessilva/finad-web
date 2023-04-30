import '../styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate, DehydratedState } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from '../components/Sidebar'

function MyApp({ Component, pageProps }: AppProps<{ dehydrateState: DehydratedState }>) {

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
          <ToastContainer />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
