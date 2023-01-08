import axios from "axios";
import { User, SignUpUserProps } from "../types/User";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
  headers: {
    "Content-type": "application/json",
  },
});

const createUser = async (signUpUser: SignUpUserProps) => {
  const response = await apiClient.post<any>("/user", signUpUser);
  return response;
}

const findAll = async () => {
  const response = await apiClient.get<User[]>("/user");
  return response;
}

const findById = async (id: string) => {
  const response = await apiClient.get<User>(`/user/${id}`);
  return response;
}

const update = async (id: string, { name, lastName }: User) => {
  const response = await apiClient.put<any>(`/user/${id}`, { name, lastName });
  return response;
}

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/user/${id}`);
  return response;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/user");
  return response;
}

const UserService = {
  createUser,
  findAll,
  findById,
  update,
  deleteById,
  deleteAll
}

export default UserService;