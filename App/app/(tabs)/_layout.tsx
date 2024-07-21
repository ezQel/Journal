import { Redirect, Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useStore from "@/hooks/useStore";
import { getToken } from "@/utils/authToken";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const store = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkIfAuthenticated() {
      const token = await getToken();

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    checkIfAuthenticated();

    if (isAuthenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [isAuthenticated]);

  if (isAuthenticated !== null && !isAuthenticated) {
    return <Redirect href="/auth/LoginScreen" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        headerStyle: {
          backgroundColor: "#f2f2f2",
        },

        tabBarLabelStyle: {
          fontWeight: 600,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Summary",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "pie-chart" : "pie-chart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journals"
        options={{
          title: "Journals",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
