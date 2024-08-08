import { useToast } from "native-base";
import { useCallback, useState } from "react";
import { Category } from "../interfaces/category";
import { ResponseError } from "../utils/response-error";
import { useAuthAxios } from "./useAuthAxios";

export function useCategories() {
  const axios = useAuthAxios();
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
        toast.show({ title, bgColor: "red.500" });
      } finally {
        setIsLoading(false);
      }
    },
    [axios, categories, toast],
  );

  const deleteCategory = useCallback(
    async (categoryId: number) => {
      setIsLoading(true);

      try {
        await axios.delete(`/categories/${categoryId}`);
        setCategories(categories.filter((c) => c.id !== categoryId));
      } catch (e) {
        const { message: title } = ResponseError(e);
        toast.show({ title, bgColor: "red.500" });
      } finally {
        setIsLoading(false);
      }
    },
    [axios, categories, toast],
  );

  return { isLoading, error, categories, fetchCategories, addCategory, deleteCategory };
}
