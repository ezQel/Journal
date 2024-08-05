import { useCallback, useState } from "react";
import { Category } from "../interfaces/category";
import { useAuthAxois } from "./useAuthAxios";
import { ResponseError } from "../utils/response-error";

export function useCategories() {
  const axios = useAuthAxois();
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(false);
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

  return { isLoading, error, categories, fetchCategories };
}
