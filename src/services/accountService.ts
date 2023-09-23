import { ICreateAccount, Account } from "../types/Account";
import { apiClient } from ".";

const createAccount = async (account: ICreateAccount) => {
  const response = await apiClient.post<any>("/account", account);
  return response;
};

const findAll = async () => {
  const response = await apiClient.get<Account[]>("/account");
  return response.data;
};

const findById = async (id: string) => {
  const response = await apiClient.get<Account>(`/account/${id}`);
  return response;
};

const update = async (id: string, { name, description }: Account) => {
  const response = await apiClient.put<any>(`/account/${id}`, {
    name,
    description,
  });
  return response;
};

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/account/${id}`);
  return response;
};

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/account");
  return response;
};

const AccountService = {
  createAccount,
  findAll,
  findById,
  update,
  deleteById,
  deleteAll,
};

export default AccountService;
