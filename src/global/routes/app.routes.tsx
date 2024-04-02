import Details from "@features/screens/Details";
import Home from "@features/screens/Home";
import Menu from "@features/screens/Menu";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export type RootAppRoutesList = {
  Home: undefined;
  Details: { id: number };
  Menu: undefined;
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

      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
}
