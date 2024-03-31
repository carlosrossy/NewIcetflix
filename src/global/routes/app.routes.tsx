import Details from "@features/Details";
import Home from "@features/screens/Home";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export type RootAppRoutesList = {
  Home: undefined;
  Details: undefined;
};

export type AppScreenNavigationProp =
  NativeStackNavigationProp<RootAppRoutesList>;

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
