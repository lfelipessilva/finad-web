import axios from "axios";
import { SignUpUserProps, SignInUserProps } from "../types/User";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
  headers: {
    "Content-type": "application/json",
  },
});

const signIn = async (signInUser: SignInUserProps) => {
  const response = await apiClient.post<any>("/auth", signInUser);
  return response.data;
}

const AuthService = {
  signIn
}

export default AuthService;