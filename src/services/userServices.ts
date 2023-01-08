import axios from "axios";
import {User, SignUpUserProps, SignInUserProps} from "../types/User";

const apiClient = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "Content-type": "application/json",
  },
});

const signUp = async (signUpUser: SignUpUserProps) => {
  const response = await apiClient.post<any>("/user", signUpUser);
  return response.data;
}

const signIn = async (signInUser: SignInUserProps) => {
  const response = await apiClient.post<any>("/user/auth", signInUser);
  return response.data;
}

const findAll = async () => {
  const response = await apiClient.get<User[]>("/user");
  return response.data;
}

const findById = async (id: string) => {
  const response = await apiClient.get<User>(`/user/${id}`);
  return response.data;
}

const update = async (id: string, { name, lastName }: User) => {
  const response = await apiClient.put<any>(`/user/${id}`, { name, lastName });
  return response.data;
}

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/user/${id}`);
  return response.data;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/user");
  return response.data;
}

const UserService = {
  signUp,
  signIn,
  findAll,
  findById,
  update,
  deleteById,
  deleteAll
}

export default UserService;