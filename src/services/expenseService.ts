import axios from "axios";
import { Expense, ICreateExpense } from "../types/Expense";
import { apiClient } from ".";

const createExpense = async (expense: ICreateExpense) => {
  const response = await apiClient.post<any>("/expense", expense);
  return response;
}

const findAll = async () => {
  const response = await apiClient.get<Expense[]>("/expense");
  return response.data;
}

const findById = async (id: string) => {
  const response = await apiClient.get<Expense>(`/expense/${id}`);
  return response;
}

const update = async (id: string, { value, description, date }: Expense) => {
  const response = await apiClient.put<any>(`/expense/${id}`, { value, description, date });
  return response;
}

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/expense/${id}`);
  return response;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/expense");
  return response;
}

const ExpenseService = {
  createExpense,
  findAll,
  findById,
  update,
  deleteById,
  deleteAll
}

export default ExpenseService;