import { formatDate } from "date-fns";
import { router } from "expo-router";
import { Badge, Box, HStack, Text } from "native-base";
import { Journal } from "../interfaces/journal.interface";

interface JournalProps {
  item: Journal;
}

export function JournalItem({ item }: JournalProps) {
  function viewJournal(journalId: number) {
    router.navigate(`/journals/${journalId}`);
  }

  return (
    <Box onTouchEnd={() => viewJournal(item.id)} background="white" mx="3" my="1" p="4" rounded="lg" key={item.id}>
      <Text fontSize="md" fontWeight="semibold" color="gray.700">
        {item.title || <Text color="gray.200">Untitled</Text>}
      </Text>
      <Text color="gray.500">{item.content.slice(0, 50)}... </Text>
      <Text color="gray.300" fontSize="xs">
        {formatDate(item.date, "eee, d LLL yyyy")}
      </Text>
      <HStack>
        <Badge rounded="lg" p="0.5">
          {item.category && (
            <Text fontSize="xs" fontWeight="medium">
              {item.category.name}
            </Text>
          )}
        </Badge>
      </HStack>
    </Box>
  );
}
