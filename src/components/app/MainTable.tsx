import { useState } from "react";
import { format, startOfMonth, add, sub, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Pencil as PencilIcon,
  Trash as TrashIcon,
  Funnel as FilterIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
} from "phosphor-react";
import { CreateExpenseModal } from "../modals/CreateExpenseModal";
import { CreateIncomeModal } from "../modals/CreateIncomeModal";
import TransactionService from "../../services/transactionService";
import { useQuery } from "react-query";
import { formatValue } from "../../utils/format";
import { AccountModal } from "../modals/AccountModal";

export const MainTable = ({
  selectedDate,
  setSelectedDate,
}: MonthPickerProps) => {
  const { data: transactions, isLoading } = useQuery(
    ["transactions", selectedDate],
    () =>
      TransactionService.findAll({
        dateStart: startOfMonth(selectedDate),
        dateEnd: endOfMonth(selectedDate),
      })
  );

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-6 rounded-t-lg bg-lightPrimary drop-shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-secondary">
          <FilterIcon size={32} />
        </div>
        <MonthPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex flex-row gap-4">
          <AccountModal />
          <CreateExpenseModal />
          <CreateIncomeModal />
        </div>
      </div>
      <table className="table w-full max-w-screen-xl overflow-hidden rounded-b-lg drop-shadow-md">
        <thead className="table-header-group w-full bg-primary">
          <tr className="table-row text-left">
            <th className="table-cell px-4 py-4">Situação</th>
            <th className="table-cell">Data</th>
            <th className="table-cell">Descrição</th>
            <th className="table-cell">Categoria</th>
            <th className="table-cell">Valor</th>
            <th className="table-cell">Ações</th>
          </tr>
        </thead>
        {transactions?.length === 0 && (
          <tr className="table-row text-left bg-lightPrimary border-b-1">
            <td className="table-cell p-4 text-xl text-center" colSpan={6}>
              Tudo vazio por aqui!
            </td>
          </tr>
        )}
        {isLoading && (
          <tr className="table-row text-left bg-lightPrimary border-b-1">
            <td className="table-cell p-4 text-xl text-center" colSpan={6}>
              Só um instante..
            </td>
          </tr>
        )}
        <tbody className="table-row-group last:rounded-lg">
          {transactions?.map((row, index) => {
            return (
              <tr
                className="table-row text-left bg-lightPrimary border-b-1"
                key={row.id}
              >
                <td className="table-cell p-4">{renderStatus(row.status)}</td>
                <td className="table-cell">
                  {format(new Date(row.date), "dd/MM/yyyy")}
                </td>
                <td className="table-cell">{row.description}</td>
                <td className="table-cell">{row?.category?.name}</td>
                <td
                  className={`table-cell
                  ${
              row.type === "expense" ? "text-unpaidRed" : "text-paidGreen"
              }`}
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
            );
          })}
        </tbody>
      </table>
    </>
  );
};

interface MonthPickerProps {
  selectedDate: Date;
  setSelectedDate: (value: Date) => void;
}

const MonthPicker = ({ selectedDate, setSelectedDate }: MonthPickerProps) => {
  return (
    <div className="flex flex-row items-center justify-center p-4">
      <ArrowLeftIcon
        size={32}
        className="transition-transform cursor-pointer text-secondary hover:scale-125"
        // @ts-ignore
        onClick={() => setSelectedDate((date) => sub(date, { months: 1 }))}
      />
      <p className="px-4 py-3 scale-75 border rounded-full opacity-50 bg-primary border-secondary">
        {format(sub(selectedDate, { months: 1 }), "MMMM/yyyy", {
          locale: ptBR,
        })}
      </p>
      <p className="px-4 py-3 bg-transparent border rounded-full border-secondary text-secondary">
        {format(selectedDate, "MMMM/yyyy", { locale: ptBR })}
      </p>
      <p className="px-4 py-3 scale-75 border rounded-full opacity-50 bg-primary border-secondary">
        {format(add(selectedDate, { months: 1 }), "MMMM/yyyy", {
          locale: ptBR,
        })}
      </p>
      <ArrowRightIcon
        size={32}
        className="transition-transform cursor-pointer text-secondary hover:scale-125"
        //@ts-ignore
        onClick={() => setSelectedDate((date) => add(date, { months: 1 }))}
      />
    </div>
  );
};
const renderStatus = (status: string) => {
  switch (status) {
  case "unpaid":
    return "Não pago";
  case "paid":
    return "Pago";
  case "unreceived":
    return "Não Recebido";
  case "received":
    return "Recebido";
  }
};
