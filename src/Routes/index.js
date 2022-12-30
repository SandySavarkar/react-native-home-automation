import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard'
import RoomDetails from '../Screens/RoomDetails'

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name={'Dashboard'} component={Dashboard} options={{ header:()=>{return null} }}/>
        <Stack.Screen name={'RoomDetails'} component={RoomDetails} options={{ header:()=>{return null} }}/>
    </Stack.Navigator>
  )
};
export default RootNavigator;
