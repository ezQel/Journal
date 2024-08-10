import { formatDate } from "date-fns";
import { router } from "expo-router";
import { Box, Center, HStack, Text } from "native-base";
import { Journal } from "../interfaces/journal.interface";

interface JournalProps {
  item: Journal;
}

export function JournalItem({ item }: JournalProps) {
  function viewJournal(journalId: number) {
    router.navigate(`/journals/${journalId}/JournalViewScreen`);
  }

  function getContentPreview(): string {
    return item.content.split("\n")[0].slice(0, 40);
  }

  return (
    <HStack onTouchEnd={() => viewJournal(item.id!)} background="white" mx="3" my="1" p="4" rounded="lg" key={item.id}>
      <Center mr="4">
        <Text fontWeight="medium" fontSize="xs" color="gray.400">
          {formatDate(item.date, "eee")}
        </Text>
        <Text fontSize="xl" fontWeight="extrabold" color="gray.400">
          {formatDate(item.date, "dd")}
        </Text>
      </Center>
      <Box flex="1">
        <HStack alignItems="center">
          <Text fontSize="md" fontWeight="semibold" color="gray.700">
            {item.title || <Text color="gray.200">Untitled</Text>}
          </Text>
          {item.category && (
            <Box rounded="lg" ml="3" px="2" backgroundColor="blue.100">
              <Text fontSize="xs" color="blue.800">
                {item.category.name}
              </Text>
            </Box>
          )}
        </HStack>
        <Text color="gray.500">{getContentPreview()}... </Text>
        <HStack>
          <Text color="gray.300" fontSize="xs">
            {formatDate(item.date, "LLLL yyyy")}
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
}
