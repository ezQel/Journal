import { router } from "expo-router";
import { Button, Center, FormControl, Input, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../components/ErrorAlert";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";
import { ThemedText } from "../../components/ThemedText";
import useStore from "../../hooks/useStore";
import { LoginCredentials } from "../../interfaces/login-credentials";
import authService from "../../services/authService";

export default function LoginScreen() {
  const store = useStore();
  const [formData, setData] = useState<LoginCredentials>({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (router.canDismiss()) {
      router.dismissAll();
    }
  });

  useEffect(() => {
    setIsValid(Boolean(formData.username && formData.password));
  }, [formData]);

  async function login() {
    setErrorMessage(null);

    try {
      const response = await authService.login(formData);
      await store.setToken(response.accessToken);
      router.replace("/(tabs)");
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }

  function navigateToRegistrationPage() {
    router.navigate("/auth/RegisterScreen");
  }

  return (
    <>
      <Center flex={1}>
        <TabBarIcon name="book" size={48} style={{ marginBottom: 12 }} />
        <ThemedText type="title">Log your life</ThemedText>
        <Text fontSize="sm" mt="3">
          Log in to start journaling
        </Text>
        <VStack width="90%" mt="16" mx="3" maxW="300px">
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <FormControl mb="2">
            <FormControl.Label _text={{ bold: true }}>Username</FormControl.Label>
            <Input
              rounded="lg"
              placeholder="Enter your username"
              onChangeText={(value) => setData({ ...formData, username: value })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
            <Input
              rounded="lg"
              placeholder="Enter your password"
              type="password"
              onChangeText={(value) => setData({ ...formData, password: value })}
            />
          </FormControl>
          <Button rounded="lg" onPress={login} mt="5" colorScheme="cyan" isDisabled={!isValid}>
            Log in
          </Button>
        </VStack>
        <Text my="6">Don't have an account?</Text>
        <Button onPress={navigateToRegistrationPage} size="sm" rounded="full" colorScheme="coolGray">
          Register
        </Button>
      </Center>
    </>
  );
}
