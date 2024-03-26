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

import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "styled-components";


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
        <ActivityIndicator color={"#8FB2F5"} />
      </View>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
