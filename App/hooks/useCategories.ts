import { useCallback, useState } from "react";
import { Category } from "../interfaces/category";
import { ResponseError } from "../utils/response-error";
import { useAuthAxois } from "./useAuthAxios";

export function useCategories() {
  const axios = useAuthAxois();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addingError, setAddingError] = useState<Error | null>();
  const [error, setError] = useState<Error | null>();

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
      setAddingError(null);

      try {
        const { data } = await axios.post("/categories", { categoryName });
        setCategories([...categories, data]);
      } catch (e) {
        setAddingError(ResponseError(e));
      } finally {
        setIsLoading(false);
      }
    },
    [axios, categories],
  );

  return { isLoading, error, addingError, categories, fetchCategories, addCategory };
}
