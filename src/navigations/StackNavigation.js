import {createStackNavigator} from '@react-navigation/stack';

import {Dashboard} from '../screens/Dashboard';
import {RoomDetails} from '../screens/RoomDetails';

const Stack = createStackNavigator();

export const StackNavigation = () => {
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
