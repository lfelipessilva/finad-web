import { SignInUserProps } from "../types/User";
import { apiClient } from ".";

const signIn = async (signInUser: SignInUserProps) => {
  const response =  apiClient.post<any>("/auth", signInUser);

  return response;
}

const logout = async () => {
  const response =  apiClient.post<any>("/auth/logout");

  return response;
}

const AuthService = {
  signIn,
  logout
}

export default AuthService;