import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Text } from "native-base";
import JournalAddScreen from "../JournalAddScreen";
import useJournals from "../../../hooks/useJournals";
import { useCallback } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

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
