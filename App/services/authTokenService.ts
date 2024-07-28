import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";

async function saveToken(value: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, value);
}

async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

async function deleteToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export default { saveToken, deleteToken, getToken };
