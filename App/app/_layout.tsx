import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "../hooks/useColorScheme.web";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="auth/RegisterScreen" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
            name="journals/[journalId]/JournalViewScreen"
            options={{ title: "", headerShadowVisible: false, headerStyle: { backgroundColor: "#f2f2f2" } }}
          ></Stack.Screen>
          <Stack.Screen
            name="journals/[journalId]/JournalEditScreen"
            options={{ title: "", headerShadowVisible: false, headerStyle: { backgroundColor: "#f2f2f2" } }}
          ></Stack.Screen>
          <Stack.Screen name="journals/JournalAddScreen"></Stack.Screen>
        </Stack>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
