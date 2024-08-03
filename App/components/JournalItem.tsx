import { Box, Text } from "native-base";
import { Journal } from "../interfaces/journal.interface";
import { useRouter } from "expo-router";
import { formatDate } from "date-fns";

interface JournalProps {
  journal: Journal;
}

export function JournalItem({ journal }: JournalProps) {
  const router = useRouter();

  function viewJournal(journalId: number) {
    router.navigate(`/journals/${journalId}`);
  }

  return (
    <Box
      onTouchEnd={() => viewJournal(journal.id)}
      background="white"
      mx="3"
      my="1"
      p="4"
      rounded="lg"
      key={journal.id}
    >
      <Text fontSize="md" fontWeight="semibold">
        {journal.title}
      </Text>
      <Text>{journal.content.slice(0, 50)}... </Text>
      <Text color="gray.300" fontSize="xs">
        {formatDate(journal.date, "eee, d LLL yyyy")}
      </Text>
    </Box>
  );
}
