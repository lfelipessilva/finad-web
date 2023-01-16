import { Transaction } from "../types/Transaction";
import { apiClient } from ".";

const createTransaction = async (transaction: Transaction) => {
  const response = await apiClient.post<any>("/transaction", transaction);
  return response;
}

const findAll = async () => {
  const response = await apiClient.get<Transaction[]>("/transaction");
  return response.data;
}

const findById = async (id: string) => {
  const response = await apiClient.get<Transaction>(`/transaction/${id}`);
  return response;
}

const update = async (id: string, { value, description, date }: Transaction) => {
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
  findById,
  update,
  deleteById,
  deleteAll
}

export default TransactionService;