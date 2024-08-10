import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { LoadingSpinner } from "../../../components/misc/LoadingSpinner";
import useJournals from "../../../hooks/useJournals";
import JournalAddScreen from "../JournalAddScreen";

export default function JournalEditScreen() {
  const { journalId } = useLocalSearchParams<{ journalId: string }>();
  const { isLoading, journal, fetchJournal } = useJournals();

  useFocusEffect(
    useCallback(() => {
      fetchJournal(journalId);
    }, [fetchJournal, journalId]),
  );

  if (isLoading) return <LoadingSpinner />;

  return <JournalAddScreen journal={journal} />;
}
