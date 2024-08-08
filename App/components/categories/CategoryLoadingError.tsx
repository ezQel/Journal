import { Menu, Text, VStack } from "native-base";

interface CategoryLoadingErrorProps {
  message: string;
}

export function CategoryLoadingError({ message }: CategoryLoadingErrorProps) {
  return (
    <Menu.Item isDisabled>
      <VStack>
        <Text fontSize="xs" color="red.500">
          Failed to load Categories
        </Text>
        <Text fontSize="xs" color="gray.500">
          {message}
        </Text>
      </VStack>
    </Menu.Item>
  );
}
