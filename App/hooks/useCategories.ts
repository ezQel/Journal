import { useToast } from "native-base";
import { useCallback, useState } from "react";
import { Category } from "../interfaces/category";
import { ResponseError } from "../utils/response-error";
import { useAuthAxois } from "./useAuthAxios";

export function useCategories() {
  const axios = useAuthAxois();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const toast = useToast();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (e) {
      setError(ResponseError(e));
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  const addCategory = useCallback(
    async (categoryName: string) => {
      setIsLoading(true);

      try {
        const { data } = await axios.post("/categories", { categoryName });
        setCategories([...categories, data]);
      } catch (e) {
        const { message: title } = ResponseError(e);
        toast.show({ title });
      } finally {
        setIsLoading(false);
      }
    },
    [axios, categories, toast],
  );

  return { isLoading, error, categories, fetchCategories, addCategory };
}
