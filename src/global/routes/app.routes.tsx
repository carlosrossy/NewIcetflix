import Details from "@features/screens/Details";
import Home from "@features/screens/Home";
import Menu from "@features/screens/Menu";
import UpdatePassword from "@features/screens/UpdatePassword";
import UpdateProfile from "@features/screens/UpdateProfile";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export type RootAppRoutesList = {
  Home: undefined;
  Details: { id: number };
  Menu: undefined;
  UpdatePassword: undefined;
  UpdateProfile: undefined;
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

      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />

      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
}
