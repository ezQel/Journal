import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../config/api";
import useStore from "./useStore";

export function useAuthAxois(baseUrl?: string) {
  const store = useStore();
  const [config, setConfig] = useState<AxiosRequestConfig>();
  const router = useRouter();

  useEffect(() => {
    if (store) {
      setConfig({
        baseURL: apiUrl || baseUrl,
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
    }
  }, [store, baseUrl]);

  const axiosInstance = useMemo(() => {
    const instance = axios.create(config);

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          store.clearToken().then(() => router.navigate("/auth/LoginScreen"));
          return;
        }

        throw error;
      },
    );

    return instance;
  }, [config, store, router]);

  return axiosInstance;
}
