import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard'
import RoomDetails from '../Screens/RoomDetails'

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name={'Dashboard'} component={Dashboard}/>
        <Stack.Screen name={'RoomDetails'} component={RoomDetails}/>
    </Stack.Navigator>
  )
};
export default RootNavigator;
