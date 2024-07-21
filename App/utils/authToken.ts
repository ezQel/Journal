import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";

export async function saveToken(value: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, value);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
