import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useStore from "./useStore";
import { apiUrl } from "@/constants/Urls";
import { useRouter } from "expo-router";

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
  }, [store]);

  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.clearToken();
        router.navigate("/auth/LoginScreen");
        throw error;
      }

      throw error;
    }
  );

  return axiosInstance;
}
