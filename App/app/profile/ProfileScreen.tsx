import { useAuthAxois } from "@/hooks/useAuthAxios";
import useStore from "@/hooks/useStore";
import { deleteToken, getToken, saveToken } from "@/utils/authToken";
import { useRouter } from "expo-router";
import { Button, Flex, Text, VStack } from "native-base";

export default function ProfileScreen() {
  const store = useStore();
  const router = useRouter();
  const axios = useAuthAxois();

  async function logout() {
    try {
      await axios.post("/auth/logout");
      await store.clearToken();
      router.navigate("/auth/LoginScreen");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex h="100%" p="4">
      <VStack flex="1">
        <Text>{store.token}</Text>
      </VStack>
      <Button onPress={logout} colorScheme="coolGray">
        LOG OUT
      </Button>
    </Flex>
  );
}
