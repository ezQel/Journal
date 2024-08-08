import { useRouter } from "expo-router";
import { Button, Flex, Text, VStack } from "native-base";
import { useAuthAxios } from "../../hooks/useAuthAxios";
import useStore from "../../hooks/useStore";

export default function ProfileScreen() {
  const store = useStore();
  const router = useRouter();
  const axios = useAuthAxios();

  async function logout() {
    try {
      await axios.post("/auth/logout");
      await store.clearToken();
      router.replace("/auth/LoginScreen");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex h="100%" p="4">
      <VStack flex="1">
        <Text>Profile</Text>
      </VStack>
      <Button onPress={logout} variant="outline" colorScheme="secondary">
        LOG OUT
      </Button>
    </Flex>
  );
}
