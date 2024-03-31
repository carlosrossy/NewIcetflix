import React from "react";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import Home from "@features/screens/Home";
import theme from "@global/styles/theme";

import { queryClient } from "./src/global/config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "styled-components";
import SignIn from "@features/auth/SignIn";
import { AppProvider } from "@global/context";
import Routes from "@global/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={"#56AB2F"} />
      </View>
    );
  }
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </AppProvider>
  );
}
