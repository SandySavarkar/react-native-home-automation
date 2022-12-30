import {createStackNavigator} from '@react-navigation/stack';

import {Dashboard} from '../screens/Dashboard';
import {RoomDetails} from '../screens/RoomDetails';
import {Login} from '../screens/Login';
import {Splashscreen} from '../screens/Splashscreen';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splashscreen">
      <Stack.Screen
        name="Splashscreen"
        options={{
          header: () => {
            return null;
          },
        }}
        component={Splashscreen}
      />
      <Stack.Screen
        name="AuthRoute"
        options={{
          header: () => {
            return null;
          },
        }}
        component={AuthRoute}
      />

      <Stack.Screen
        name="PublicRoute"
        options={{
          header: () => {
            return null;
          },
        }}
        component={PublicRoute}
      />
    </Stack.Navigator>
  );
};

const AuthRoute = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        options={{
          header: () => {
            return null;
          },
        }}
        component={Dashboard}
      />

      <Stack.Screen
        name="RoomDetails"
        options={{
          header: () => {
            return null;
          },
        }}
        component={RoomDetails}
      />
    </Stack.Navigator>
  );
};

const PublicRoute = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{
          header: () => {
            return null;
          },
        }}
        component={Login}
      />
    </Stack.Navigator>
  );
};