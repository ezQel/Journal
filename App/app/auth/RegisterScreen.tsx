import { router } from "expo-router";
import { Button, Center, FormControl, Input, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../components/ErrorAlert";
import { ThemedText } from "../../components/ThemedText";
import useStore from "../../hooks/useStore";
import { RegistrationInfo } from "../../interfaces/registration-info";
import authService from "../../services/authService";

export default function RegisterScreen() {
  const store = useStore();
  const toast = useToast();
  const [formData, setData] = useState<RegistrationInfo>({});
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const { username, password, repeatPassword } = formData;

    if (!username || !password || !repeatPassword) {
      setIsValid(false);
      return;
    }

    setPasswordsMatch(password === repeatPassword);
    setIsValid(password === repeatPassword);
  }, [formData]);

  async function register() {
    setErrorMessage(null);

    try {
      const response = await authService.register(formData);
      await store.setToken(response.accessToken);
      toast.show({ title: "Account created successfully" });
      router.replace("/(tabs)");
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }

  function navigateToLoginPage() {
    router.replace("/auth/LoginScreen");
  }

  return (
    <>
      <Center flex="1">
        <ThemedText type="title">Register</ThemedText>
        <Text fontSize="sm" mt="3">
          Create an account to start journaling
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
          <FormControl mb="2">
            <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
            <Input
              rounded="lg"
              placeholder="Enter your password"
              type="password"
              onChangeText={(value) => setData({ ...formData, password: value })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ bold: true }}>Repeat Password</FormControl.Label>
            <Input
              rounded="lg"
              placeholder="Enter your password"
              type="password"
              onChangeText={(value) => setData({ ...formData, repeatPassword: value })}
            />
          </FormControl>
          {passwordsMatch || <Text color="red.500">Passwords don't match</Text>}
          <Button rounded="lg" onPress={register} mt="5" colorScheme="cyan" isDisabled={!isValid}>
            Register
          </Button>
        </VStack>
        <Text my="6">Already have an account?</Text>
        <Button onPress={navigateToLoginPage} size="sm" rounded="full" colorScheme="coolGray">
          Go to Login
        </Button>
      </Center>
    </>
  );
}
