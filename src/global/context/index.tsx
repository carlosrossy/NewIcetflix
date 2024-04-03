import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "./auth";
import theme from "@global/styles/theme";
import { FavoriteProvider } from "./favorite";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
          <AuthProvider>
            <FavoriteProvider>{children}</FavoriteProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};
