import { useCallback, useState } from "react";
import { useAuthAxios } from "./useAuthAxios";
import { ResponseError } from "../utils/response-error";
import useStore from "./useStore";
import { router } from "expo-router";
import { useToast } from "native-base";
import { User } from "../interfaces/user";

export function useProfile() {
  const axios = useAuthAxios();
  const store = useStore();
  const toast = useToast();
  const [profile, setProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState<Error | null>();

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get("/user/profile");
      setProfile(data);
    } catch (e) {
      setError(ResponseError(e));
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  const updateUsername = useCallback(
    async (username: string) => {
      setIsUpdating(true);
      setUpdatingError(null);

      try {
        await axios.put("/user/update-username", { username });
      } catch (e) {
        const _error = ResponseError(e);
        setUpdatingError(_error);
        throw _error;
      } finally {
        setIsUpdating(false);
      }
    },
    [axios],
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      setIsUpdating(true);
      setUpdatingError(null);

      try {
        await axios.put("/user/change-password", { currentPassword, newPassword });
      } catch (e) {
        const _error = ResponseError(e);
        setUpdatingError(_error);
        throw _error;
      } finally {
        setIsUpdating(false);
      }
    },
    [axios],
  );

  const logout = useCallback(async () => {
    try {
      await axios.post("/auth/logout");
      await store.clearToken();
      router.replace("/auth/LoginScreen");
    } catch (e) {
      const { message: title } = ResponseError(e);
      toast.show({ title, backgroundColor: "red.500" });
    }
  }, [axios, store, toast]);

  return { fetchProfile, updateUsername, changePassword, logout, isLoading, isUpdating, profile, error, updatingError };
}
