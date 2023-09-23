import { useState } from "react"
import {
  ArrowCircleDown as ArrowCircleUpIcon,
  ArrowCircleUp as ArrowCircleDownIcon,
  Scales as ScalesIcon
} from "phosphor-react"
import Head from "next/head"
import { dehydrate, QueryClient, useQuery } from "react-query"
import TransactionService from "../../services/transactionService"
import { MainTable } from "../../components/app/MainTable"
import { endOfMonth, startOfMonth } from "date-fns"
import { formatValue } from "../../utils/format"

export default function Home(props: any) {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfMonth(new Date()))

  const { data: balances, isLoading } = useQuery(["transactions_balances", selectedDate], () =>
    TransactionService.findBalances({ dateStart: startOfMonth(selectedDate), dateEnd: endOfMonth(selectedDate) })
  );

  return (
    <>
      <Head>
        <title>Finad | Home</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-cover h-screen p-4">
        <main className="flex flex-col w-full max-w-7xl justify-between items-center">
          <div className="flex flex-row items-center w-full max-w-7xl justify-between pb-6">
            <div className="flex flex-row items-center bg-lightPrimary p-2 g-4 rounded-3xl w-3/12">
              <ArrowCircleDownIcon size={48} className="text-paidGreen" />
              <div className="flex flex-col">
                <h3 className="text-2xl text-white opacity-80">Receitas Totais:</h3>
                <h2 className="text-3xl text-white">{formatValue(balances?.income)}</h2>
              </div>
            </div>
            <div className="flex flex-row items-center bg-lightPrimary p-2 g-4 rounded-3xl w-3/12">
              <ScalesIcon size={48} />
              <div className="flex flex-col">
                <h3 className="text-2xl text-white opacity-80">Saldo do mês:</h3>
                <h2 className="text-3xl text-white">{formatValue(balances?.balance)}</h2>
              </div>
            </div>
            <div className="flex flex-row items-center bg-lightPrimary p-2 g-4 rounded-3xl w-3/12">
              <ArrowCircleUpIcon size={48} className="text-unpaidRed" />
              <div className="flex flex-col">
                <h3 className="text-2xl text-white opacity-80">Despesas Totais:</h3>
                <h2 className="text-3xl text-white">{formatValue(balances?.expense)}</h2>
              </div>
            </div>
          </div>
          <MainTable selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("transactions", () =>
    TransactionService.findAll({ dateStart: startOfMonth(new Date()), dateEnd: endOfMonth(new Date()) })
  );

  await queryClient.prefetchQuery("transactions_balance", () =>
    TransactionService.findBalances({ dateStart: startOfMonth(new Date()), dateEnd: endOfMonth(new Date()) })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
