import styled from 'styled-components'
import NextLink from 'next/link'
import Image from 'next/image'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import LogInButton from '../../components/buttons/LogIn'
import SignInButton from '../../components/buttons/SignIn'
import {
  Pencil as PencilIcon,
  Trash as TrashIcon, Funnel as FilterIcon,
  ArrowCircleDown as ArrowCircleUpIcon,
  ArrowCircleUp as ArrowCircleDownIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  Scales as ScalesIcon
} from 'phosphor-react'
import Input from '../../components/Input'
import SignInWithGoogleButton from '../../components/buttons/SignInWithGoogle'
import Head from 'next/head'
import { useEffect } from 'react'
import { Form } from '@unform/web'
import { SignInUserProps } from '../../types/User'
import { useMutation, dehydrate, QueryClient, useQuery } from 'react-query'
import AuthService from '../../services/authService'
import Router from 'next/router'
import IncomeService from '../../services/incomeService'
import ExpenseService from '../../services/expenseService'
import { format } from 'date-fns'

export default function Home(props: any) {

  const { data: incomes } = useQuery("incomes", () =>
    IncomeService.findAll()
  );
  const { data: expenses } = useQuery("expenses", () =>
    ExpenseService.findAll()
  );

  const allData = [...incomes || [], ...expenses || []]
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
          <div className="flex flex-row justify-between px-6 items-center w-full bg-secondary rounded-t-lg drop-shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-darkPrimary rounded-full">
              <FilterIcon size={32} />
            </div>
            <div className="flex flex-row items-center justify-center p-4">
              <ArrowLeftIcon size={32} className="text-lightSecondary" />
              <p className="py-3 px-4 bg-darkPrimary rounded-full scale-75 opacity-50">
                maio/2021
              </p>
              <p className="py-3 px-4 bg-darkPrimary rounded-full">
                junho/2021
              </p>
              <p className="py-3 px-4 bg-darkPrimary rounded-full scale-75 opacity-50">
                julho/2021
              </p>
              <ArrowRightIcon size={32} className="text-lightSecondary" />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-unpaidRed rounded-full">
                <ArrowCircleUpIcon size={32} />
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-paidGreen rounded-full">
                <ArrowCircleDownIcon size={32} />
              </div>
            </div>
          </div>
          <table className="w-full max-w-screen-xl table rounded-b-lg overflow-hidden drop-shadow-md">
            <thead className="bg-darkPrimary w-full table-header-group" >
              <tr className="table-row text-left ">
                <th className="table-cell text-sm font-semibold py-4 px-4">Situação</th>
                <th className="table-cell text-sm font-semibold py-4 px-4">Tipo</th>
                <th className="table-cell text-sm font-semibold">Data</th>
                <th className="table-cell text-sm font-semibold">Descrição</th>
                <th className="table-cell text-sm font-semibold">Categoria</th>
                <th className="table-cell text-sm font-semibold">Valor</th>
                <th className="table-cell text-sm font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="table-row-group last:rounded-lg">
              {allData.map((row, index) => {
                return (
                  <tr className="bg-white border-b-1 table-row text-left" key={row.id}>
                    {/* <td className="table-cell text-sm font-semibold p-4">{row.status}</td> */}
                    {/* <td className="table-cell text-sm font-semibold">{row.type}</td> */}
                    <td className="table-cell text-sm font-semibold">{format(new Date(row.date), 'MM/dd/yyyy')}</td>
                    <td className="table-cell text-sm font-semibold">{row.description}</td>
                    {/* <td className="table-cell text-sm font-semibold">{row.category}</td> */}
                    <td className="table-cell text-sm font-semibold text-unpaidRed">R${row.value}</td>
                    <td className="table-cell text-sm font-semibold">
                      <div className="flex flex-row">
                        <PencilIcon size={24} />
                        <TrashIcon size={24} />
                      </div>
                    </td>
                  </tr>
                )
              })}

              <tr className="bg-white border-b-1 table-row text-left ">
                <td className="table-cell text-sm font-semibold p-4">Pago</td>
                <td className="table-cell text-sm font-semibold">Despesa</td>
                <td className="table-cell text-sm font-semibold">05/07/2022</td>
                <td className="table-cell text-sm font-semibold">Curso Udemy</td>
                <td className="table-cell text-sm font-semibold">Educação</td>
                <td className="table-cell text-sm font-semibold text-unpaidRed">R$37.99</td>
                <td className="table-cell text-sm font-semibold">
                  <div className="flex flex-row">
                    <PencilIcon size={24} />
                    <TrashIcon size={24} />
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b-1 table-row text-left ">
                <td className="table-cell text-sm font-semibold p-4">Não pago</td>
                <td className="table-cell text-sm font-semibold">Despesa</td>
                <td className="table-cell text-sm font-semibold">05/07/2022</td>
                <td className="table-cell text-sm font-semibold">Curso Udemy</td>
                <td className="table-cell text-sm font-semibold">Educação</td>
                <td className="table-cell text-sm font-semibold text-unpaidRed">R$37.99</td>
                <td className="table-cell text-sm font-semibold">
                  <div className="flex flex-row">
                    <PencilIcon size={24} />
                    <TrashIcon size={24} />
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b-1 table-row text-left ">
                <td className="table-cell text-sm font-semibold p-4">Pago</td>
                <td className="table-cell text-sm font-semibold">Receita</td>
                <td className="table-cell text-sm font-semibold">02/07/2022</td>
                <td className="table-cell text-sm font-semibold">Salário do emprego principal</td>
                <td className="table-cell text-sm font-semibold">Salário</td>
                <td className="table-cell text-sm font-semibold text-paidGreen">R$3799.99</td>
                <td className="table-cell text-sm font-semibold">
                  <div className="flex flex-row">
                    <PencilIcon size={24} />
                    <TrashIcon size={24} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("incomes", () =>
    IncomeService.findAll()
  );

  await queryClient.prefetchQuery("expenses", () =>
    ExpenseService.findAll()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
