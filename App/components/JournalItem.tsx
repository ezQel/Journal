import { formatDate } from "date-fns";
import { router } from "expo-router";
import { Badge, Box, Center, Flex, HStack, Text, VStack } from "native-base";
import { Journal } from "../interfaces/journal.interface";

interface JournalProps {
  item: Journal;
}

export function JournalItem({ item }: JournalProps) {
  function viewJournal(journalId: number) {
    router.navigate(`/journals/${journalId}`);
  }

  function getContentPreview(): string {
    return item.content.split("\n")[0].slice(0, 40);
  }

  return (
    <HStack onTouchEnd={() => viewJournal(item.id)} background="white" mx="3" my="1" p="4" rounded="lg" key={item.id}>
      <Center mr="4">
        <Text fontWeight="medium" fontSize="xs" color="gray.400">
          {formatDate(item.date, "eee")}
        </Text>
        <Text fontSize="xl" fontWeight="extrabold" color="gray.400">
          {formatDate(item.date, "d")}
        </Text>
      </Center>
      <Box flex="1">
        <HStack>
          <Text fontSize="md" fontWeight="semibold" color="gray.700">
            {item.title || <Text color="gray.200">Untitled</Text>}
          </Text>
          {item.category && (
            <Badge rounded="lg" p="0.5" ml="3">
              <Text fontSize="xs" fontWeight="medium">
                {item.category.name}
              </Text>
            </Badge>
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
