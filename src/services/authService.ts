import { SignInUserProps } from "../types/User";
import { apiClient } from ".";

const signIn = async (signInUser: SignInUserProps) => {
  const response =  apiClient.post<any>("/auth", signInUser);

  return response;
}

const AuthService = {
  signIn
}

export default AuthService;