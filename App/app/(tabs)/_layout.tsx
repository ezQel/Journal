import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import authTokenService from "../../services/authTokenService";

export default function TabLayout() {
  const store = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkIfAuthenticated() {
      const token = await authTokenService.getToken();

      if (token) {
        store.token = token;
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    checkIfAuthenticated();

    if (isAuthenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [isAuthenticated, store]);

  if (isAuthenticated !== null && !isAuthenticated) {
    return <Redirect href="/auth/LoginScreen" />;
  }

  return <Text>Hello, youre loged in</Text>;
}
