import { Alert, HStack, Text } from "native-base";

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert w="100%" mb="4" status="error">
      <HStack space="2">
        <Alert.Icon mt="1" />
        <Text flex="1">{message}</Text>
      </HStack>
    </Alert>
  );
}
