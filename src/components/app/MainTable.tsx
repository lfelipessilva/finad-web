import { ITransaction } from "../../types/Transaction"
import { format } from 'date-fns'
import {
  Pencil as PencilIcon,
  Trash as TrashIcon, Funnel as FilterIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'phosphor-react'
import { CreateExpenseModal } from "../modals/CreateExpenseModal"
import { CreateIncomeModal } from "../modals/CreateIncomeModal"

type ComponentProps = {
  transactions: ITransaction[] | undefined,
}

export const MainTable = ({ transactions }: ComponentProps) => {
  return (
    <>
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
                <td className="table-cell text-sm font-semibold">{format(new Date(row.date), 'MM/dd/yyyy')}</td>
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

const renderStatus = (status: string) => {
  switch (status) {
  case 'unpaid':
    return 'Não pago'
  case 'paid':
    return 'Pago'
  }
}

const formatValue = (value: number) => {
  const v = value / 100

  return v.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}