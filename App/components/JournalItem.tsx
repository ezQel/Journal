import { Badge, Box, HStack, Text } from "native-base";
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
      <Text fontSize="md" fontWeight="semibold" color="gray.700">
        {journal.title || <Text color="gray.200">Untitled</Text>}
      </Text>
      <Text color="gray.500">{journal.content.slice(0, 50)}... </Text>
      <Text color="gray.300" fontSize="xs">
        {formatDate(journal.date, "eee, d LLL yyyy")}
      </Text>
      <HStack>
        <Badge rounded="lg" p="0.5">
          {journal.category && (
            <Text fontSize="xs" fontWeight="medium">
              {journal.category.name}
            </Text>
          )}
        </Badge>
      </HStack>
    </Box>
  );
}
