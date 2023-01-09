import axios from "axios";
import { Income } from "../types/Income";
import { apiClient } from ".";

const createIncome = async (income: Income) => {
  const response = await apiClient.post<any>("/income", income);
  return response;
}

const findAll = async () => {
  const response = await apiClient.get<Income[]>("/income");
  return response.data;
}

const findById = async (id: string) => {
  const response = await apiClient.get<Income>(`/income/${id}`);
  return response;
}

const update = async (id: string, { value, description, date }: Income) => {
  const response = await apiClient.put<any>(`/income/${id}`, { value, description, date });
  return response;
}

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/income/${id}`);
  return response;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/income");
  return response;
}

const IncomeService = {
  createIncome,
  findAll,
  findById,
  update,
  deleteById,
  deleteAll
}

export default IncomeService;