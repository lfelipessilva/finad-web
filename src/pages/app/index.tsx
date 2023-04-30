import Header from '../../components/Header'
import {
  ArrowCircleDown as ArrowCircleUpIcon,
  ArrowCircleUp as ArrowCircleDownIcon,
  Scales as ScalesIcon
} from 'phosphor-react'
import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'
import TransactionService from '../../services/transactionService'
import { MainTable } from '../../components/app/MainTable'

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Finad | Home</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-col w-full max-w-7xl justify-between items-center">
          <div className="flex flex-row items-center w-full max-w-7xl justify-between pb-6">
            <div className="flex flex-row items-center bg-secondary p-2 g-4 rounded-3xl w-3/12">
              <ArrowCircleDownIcon size={48} className="text-paidGreen" />
              <div className="flex flex-col">
                <h3 className="text-2xl text-white opacity-80">Receitas Totais:</h3>
                <h2 className="text-3xl text-white">R$ 4039,39</h2>
              </div>
            </div>
            <div className="flex flex-row items-center bg-secondary p-2 g-4 rounded-3xl w-3/12">
              <ScalesIcon size={48} />
              <div className="flex flex-col">
                <h3 className="text-2xl text-white opacity-80">Saldo Atual:</h3>
                <h2 className="text-3xl text-white">R$ 241,38</h2>
              </div>
            </div>
            <div className="flex flex-row items-center bg-secondary p-2 g-4 rounded-3xl w-3/12">
              <ArrowCircleUpIcon size={48} className="text-unpaidRed" />
              <div className="flex flex-col">
                <h3 className="text-2xl text-white opacity-80">Despesas Totais:</h3>
                <h2 className="text-3xl text-white">R$ 703,09</h2>
              </div>
            </div>
          </div>
          <MainTable />
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("transactions", () =>
    TransactionService.findAll({})
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
