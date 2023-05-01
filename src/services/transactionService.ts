import { ITransaction, ICreateTransaction } from "../types/Transaction";
import { apiClient } from ".";

interface IFindAll {
  dateStart: Date,
  dateEnd: Date
}

const createTransaction = async (transaction: ICreateTransaction) => {
  const response = await apiClient.post<any>("/transaction", transaction);
  return response;
}

const findAll = async ({ dateStart, dateEnd }: IFindAll) => {
  const response = await apiClient.get<ITransaction[]>("/transaction", { params: { dateStart, dateEnd } })
  return response.data;
}

const findBalances = async ({ dateStart, dateEnd }: IFindAll) => {
  const response = await apiClient.get<{balance: number, expense: number, income: number}>("/transaction/balance", { params: { dateStart, dateEnd } })
  return response.data;
}

const findById = async (id: string) => {
  const response = await apiClient.get<ITransaction>(`/transaction/${id}`);
  return response;
}

const update = async (id: string, { value, description, date }: ITransaction) => {
  const response = await apiClient.put<any>(`/transaction/${id}`, { value, description, date });
  return response;
}

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/transaction/${id}`);
  return response;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/transaction");
  return response;
}

const TransactionService = {
  createTransaction,
  findAll,
  findBalances,
  findById,
  update,
  deleteById,
  deleteAll
}

export default TransactionService;