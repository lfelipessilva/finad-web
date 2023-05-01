import { useState } from "react"
import { format, startOfMonth, add, sub, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Pencil as PencilIcon,
  Trash as TrashIcon, Funnel as FilterIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'phosphor-react'
import { CreateExpenseModal } from "../modals/CreateExpenseModal"
import { CreateIncomeModal } from "../modals/CreateIncomeModal"
import TransactionService from "../../services/transactionService"
import { useQuery } from "react-query"
import { formatValue } from "../../utils/format"

export const MainTable = ({selectedDate, setSelectedDate}: MonthPickerProps) => {
  const { data: transactions, isLoading } = useQuery(["transactions", selectedDate], () =>
    TransactionService.findAll({ dateStart: startOfMonth(selectedDate), dateEnd: endOfMonth(selectedDate) })
  );

  return (
    <>
      <div className="flex flex-row justify-between px-6 items-center w-full bg-lightPrimary rounded-t-lg drop-shadow-md">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full text-secondary">
          <FilterIcon size={32} />
        </div>
        <MonthPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className="flex flex-row gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-unpaidRed rounded-full">
            <CreateExpenseModal />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-paidGreen rounded-full">
            <CreateIncomeModal />
          </div>
        </div>
      </div>
      <table className="w-full max-w-screen-xl table rounded-b-lg overflow-hidden drop-shadow-md">
        <thead className="bg-primary w-full table-header-group" >
          <tr className="table-row text-left">
            <th className="table-cell py-4 px-4">Situação</th>
            <th className="table-cell">Data</th>
            <th className="table-cell">Descrição</th>
            <th className="table-cell">Categoria</th>
            <th className="table-cell">Valor</th>
            <th className="table-cell">Ações</th>
          </tr>
        </thead>
        {transactions?.length === 0 && (
          <tr className="bg-lightPrimary border-b-1 table-row text-left">
            <td className="table-cell p-4 text-center text-xl" colSpan={6}>Tudo vazio por aqui!</td>
          </tr>

        )}
        {isLoading && (
          <tr className="bg-lightPrimary border-b-1 table-row text-left">
            <td className="table-cell p-4 text-center text-xl" colSpan={6}>Só um instante..</td>
          </tr>
        )}
        <tbody className="table-row-group last:rounded-lg">
          {transactions?.map((row, index) => {
            return (
              <tr className="bg-lightPrimary border-b-1 table-row text-left" key={row.id}>
                <td className="table-cell p-4">{renderStatus(row.status)}</td>
                <td className="table-cell">{format(new Date(row.date), 'dd/MM/yyyy')}</td>
                <td className="table-cell">{row.description}</td>
                <td className="table-cell">{row?.category?.name}</td>
                <td
                  className={`table-cell
                  ${row.type === 'expense' ? 'text-unpaidRed' : 'text-paidGreen'}`}
                >
                  {formatValue(row.value)}
                </td>
                <td className="table-cell">
                  <div className="flex flex-row">
                    <PencilIcon size={24} />
                    <TrashIcon size={24} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

interface MonthPickerProps {
  selectedDate: Date;
  setSelectedDate: (value: Date) => void;
}

const MonthPicker = ({ selectedDate, setSelectedDate }: MonthPickerProps) => {
  return (
    <div className="flex flex-row items-center justify-center p-4">
      <ArrowLeftIcon
        size={32}
        className="text-secondary hover:scale-125 transition-transform cursor-pointer"
        // @ts-ignore
        onClick={() => setSelectedDate(date => sub(date, { months: 1 }))}
      />
      <p className="py-3 px-4 bg-primary rounded-full scale-75 opacity-50 border border-secondary">
        {format(sub(selectedDate, { months: 1 }), 'MMMM/yyyy', { locale: ptBR })}
      </p>
      <p className="py-3 px-4 bg-transparent rounded-full border border-secondary text-secondary">
        {format(selectedDate, 'MMMM/yyyy', { locale: ptBR })}
      </p>
      <p className="py-3 px-4 bg-primary rounded-full scale-75 opacity-50 border border-secondary">
        {format(add(selectedDate, { months: 1 }), 'MMMM/yyyy', { locale: ptBR })}
      </p>
      <ArrowRightIcon
        size={32}
        className="text-secondary hover:scale-125 transition-transform cursor-pointer"
        //@ts-ignore
        onClick={() => setSelectedDate(date => add(date, { months: 1 }))}
      />
    </div>
  )
}
const renderStatus = (status: string) => {
  switch (status) {
  case 'unpaid':
    return 'Não pago'
  case 'paid':
    return 'Pago'
  case 'unreceived':
    return 'Não Recebido'
  case 'received':
    return 'Recebido'
  }
}