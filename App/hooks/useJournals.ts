import { useCallback, useState } from "react";
import { Journal } from "../interfaces/journal.interface";
import { ResponseError } from "../utils/response-error";
import { useAuthAxios } from "./useAuthAxios";

export default function useJournals() {
  const axios = useAuthAxios();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>();

  const fetchJournals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get<Journal[]>("/journals");
      setJournals(data);
    } catch (e) {
      setError(ResponseError(e));
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  const saveJournal = useCallback(
    async (journal: Partial<Journal>) => {
      setIsSaving(true);
      setError(null);

      try {
        await axios.post<Journal>("/journals", journal);
      } catch (e) {
        setError(ResponseError(e));
      } finally {
        setIsSaving(false);
      }
    },
    [axios],
  );

  return { journals, isLoading, isSaving, error, fetchJournals, saveJournal };
}
