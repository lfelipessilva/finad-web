import { useState } from "react"
import { format, startOfMonth, add, sub, getMonth, getYear } from 'date-fns'
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

export const MainTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfMonth(new Date()))

  const { data: transactions } = useQuery(["transactions", selectedDate], () =>
    TransactionService.findAll({ month: getMonth(selectedDate) + 1, year: getYear(selectedDate) })
  );

  return (
    <>
      <div className="flex flex-row justify-between px-6 items-center w-full bg-secondary rounded-t-lg drop-shadow-md">
        <div className="flex items-center justify-center w-12 h-12 bg-darkPrimary rounded-full">
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
        <thead className="bg-darkPrimary w-full table-header-group" >
          <tr className="table-row text-left ">
            <th className="table-cell text-sm font-semibold py-4 px-4">Situação</th>
            <th className="table-cell text-sm font-semibold">Data</th>
            <th className="table-cell text-sm font-semibold">Descrição</th>
            <th className="table-cell text-sm font-semibold">Categoria</th>
            <th className="table-cell text-sm font-semibold">Valor</th>
            <th className="table-cell text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="table-row-group last:rounded-lg">
          {transactions?.map((row, index) => {
            return (
              <tr className="bg-white border-b-1 table-row text-left" key={row.id}>
                <td className="table-cell text-sm font-semibold p-4">{renderStatus(row.status)}</td>
                <td className="table-cell text-sm font-semibold">{format(new Date(row.date), 'dd/MM/yyyy')}</td>
                <td className="table-cell text-sm font-semibold">{row.description}</td>
                <td className="table-cell text-sm font-semibold">{row.category}</td>
                <td
                  className={`table-cell text-sm font-semibold
                  ${row.type === 'expense' ? 'text-unpaidRed' : 'text-paidGreen'}`}
                >
                  {formatValue(row.value)}
                </td>
                <td className="table-cell text-sm font-semibold">
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
        className="text-lightSecondary"
        // @ts-ignore
        onClick={() => setSelectedDate(date => sub(date, { months: 1}))}
      />
      <p className="py-3 px-4 bg-darkPrimary rounded-full scale-75 opacity-50">
        {format(sub(selectedDate, { months: 1 }), 'MMMM/yyyy', { locale: ptBR })}
      </p>
      <p className="py-3 px-4 bg-darkPrimary rounded-full">
        {format(selectedDate, 'MMMM/yyyy', { locale: ptBR })}
      </p>
      <p className="py-3 px-4 bg-darkPrimary rounded-full scale-75 opacity-50">
        {format(add(selectedDate, { months: 1 }), 'MMMM/yyyy', { locale: ptBR })}
      </p>
      <ArrowRightIcon
        size={32}
        className="text-lightSecondary"
        //@ts-ignore
        onClick={() => setSelectedDate(date => add(date, { months: 1}))}
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

const formatValue = (value: number) => {
  const v = value / 100

  return v.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}