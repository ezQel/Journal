import { useCallback, useState } from "react";
import { Journal } from "../interfaces/journal.interface";
import { ResponseError } from "../utils/response-error";
import { useAuthAxios } from "./useAuthAxios";
import { useToast } from "native-base";

export default function useJournals() {
  const axios = useAuthAxios();
  const toast = useToast();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [journal, setJournal] = useState<Journal>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const fetchJournal = useCallback(
    async (journalId?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<Journal>("/journals/" + journalId);
        setJournal(data);
      } catch (e) {
        setError(ResponseError(e));
      } finally {
        setIsLoading(false);
      }
    },
    [axios],
  );

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

  const updateJournal = useCallback(
    async (journalId: number, journal: Partial<Journal>) => {
      setIsSaving(true);
      setError(null);

      try {
        await axios.put<Journal>("/journals/" + journalId, journal);
      } catch (e) {
        setError(ResponseError(e));
      } finally {
        setIsSaving(false);
      }
    },
    [axios],
  );

  const removeJournal = useCallback(
    async (journalId: string) => {
      setIsDeleting(true);

      try {
        await axios.delete<Journal>("/journals/" + journalId);
      } catch (e) {
        const { message: title } = ResponseError(e);
        toast.show({ title, bgColor: "red.500" });
      } finally {
        setIsDeleting(false);
      }
    },
    [axios, toast],
  );

  return {
    journals,
    journal,
    isLoading,
    isSaving,
    isDeleting,
    error,
    fetchJournals,
    fetchJournal,
    saveJournal,
    updateJournal,
    removeJournal,
  };
}
