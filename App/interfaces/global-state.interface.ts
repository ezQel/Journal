import { LoginCredentials } from "./login-credentials.interface";

export interface GlobalState {
  token: string | null;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
}
