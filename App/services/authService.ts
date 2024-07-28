import axios from "axios";
import { apiUrl } from "../config/api";
import { LoginCredentials } from "../interfaces/login-credentials";
import { LoginResponse } from "../interfaces/login-response";
import { RegistrationInfo } from "../interfaces/registration-info";
import { RegistrationResponse } from "../interfaces/registration-response";

async function register(registrationInfo: RegistrationInfo): Promise<RegistrationResponse> {
  try {
    const { data } = await axios.post<RegistrationResponse>(apiUrl + "/auth/register", registrationInfo);
    return data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}

async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const { data } = await axios.post<LoginResponse>(apiUrl + "/auth/login", credentials);
    return data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}

async function logout(): Promise<void> {
  try {
    await axios.post(apiUrl + "/auth/logout");
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
}

export default { register, login, logout };
