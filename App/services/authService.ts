import axios from "axios";
import { apiUrl } from "../config/api";
import { LoginCredentials } from "../interfaces/login-credentials";
import { LoginResponse } from "../interfaces/login-response";
import { RegistrationInfo } from "../interfaces/registration-info";
import { RegistrationResponse } from "../interfaces/registration-response";
import { ResponseError } from "../utils/response-error";

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

export default { register, login };
