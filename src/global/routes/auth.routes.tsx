import Details from "@features/Details";
import RecoverPassword from "@features/auth/RecoverPassword";
import SignIn from "@features/auth/SignIn";
import SignUp from "@features/auth/SignUp";
import Home from "@features/screens/Home";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export type RootAuthRoutesList = {
  SignIn: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
};

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<RootAuthRoutesList>;

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    </Stack.Navigator>
  );
}
