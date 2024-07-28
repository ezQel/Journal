import axios, { AxiosError } from "axios";
import { apiUrl } from "../config/api";
import { LoginCredentials } from "../interfaces/login-credentials";
import { LoginResponse } from "../interfaces/login-response";
import { RegistrationInfo } from "../interfaces/registration-info";
import { RegistrationResponse } from "../interfaces/registration-response";

function ResponseError(e: unknown): Error {
  const error = e as AxiosError<Error>;
  return new Error(error?.response?.data?.message || "Network/ unkown error");
}

async function register(registrationInfo: RegistrationInfo): Promise<RegistrationResponse> {
  try {
    const { data } = await axios.post<RegistrationResponse>(apiUrl + "/auth/register", registrationInfo);
    return data;
  } catch (e) {
    throw ResponseError(e);
  }
}

async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const { data } = await axios.post<LoginResponse>(apiUrl + "/auth/login", credentials);
    return data;
  } catch (e) {
    throw ResponseError(e);
  }
}

async function logout(): Promise<void> {
  try {
    // TODO: Call logout in authenticated state
    await axios.post(apiUrl + "/auth/logout");
  } catch (e) {
    throw ResponseError(e);
  }
}

export default { register, login, logout };
