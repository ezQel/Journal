import { useCallback, useState } from "react";
import { Journal } from "../interfaces/journal.interface";
import { ResponseError } from "../utils/response-error";
import { useAuthAxois } from "./useAuthAxios";

export default function useJournals() {
  const axios = useAuthAxois();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>();

  const fetchJournals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Journal[]>("/journals");
      setJournals(response.data);
    } catch (e) {
      const error = ResponseError(e);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  return { journals, loading, error, fetchJournals };
}
