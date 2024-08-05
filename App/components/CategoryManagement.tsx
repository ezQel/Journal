import { FontAwesome6 } from "@expo/vector-icons";
import { Button, Center, HStack, Icon, Input, Text, VStack } from "native-base";

export function CategoryManagement() {
  return (
    <>
      <HStack alignItems="flex-end" space="2">
        <Input
          flex="1"
          placeholder="Enter a category name"
          backgroundColor="transparent"
          borderWidth="0"
          borderBottomWidth="1"
        />
        <Button size="sm">Add</Button>
      </HStack>
      <VStack>
        <Center h="24">
          <Icon as={FontAwesome6} name="file-text" size="md" color="gray.300" />
          <Text color="gray.400" fontSize="xs">
            No categories
          </Text>
        </Center>
      </VStack>
    </>
  );
}
