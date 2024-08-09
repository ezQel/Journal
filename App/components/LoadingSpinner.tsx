import { HStack, Spinner, Text } from "native-base";

export function LoadingSpinner() {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Text color="primary.600">Loading</Text>
    </HStack>
  );
}
