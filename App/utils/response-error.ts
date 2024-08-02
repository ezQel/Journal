import { AxiosError } from "axios";

export function ResponseError(e: unknown): Error {
  const error = e as AxiosError<Error>;
  return new Error(error?.response?.data?.message || "Network/ unkown error");
}
