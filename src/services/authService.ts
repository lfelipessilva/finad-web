import { SignInUserProps } from "../types/User";
import { apiClient } from ".";

const signIn = async (signInUser: SignInUserProps) => {
  const response = await apiClient.post<any>("/auth", signInUser);

  return response;
}

const AuthService = {
  signIn
}

export default AuthService;