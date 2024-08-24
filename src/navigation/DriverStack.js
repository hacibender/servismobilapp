import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DriverProfileScreen } from '../screens/driver/DriverProfileScreen';
import { DriverRootScreen } from '../screens/driver/DriverRootScreen';
import { DriverBusScreen } from '../screens/driver/DriverBusScreen';
import { DriverStatsScreen } from '../screens/driver/DriverStatsScreen';

const Stack = createStackNavigator();

const DriverStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />
        <Stack.Screen name="DriverRootScreen" component={DriverRootScreen} />
        <Stack.Screen name="DriverBusScreen" component={DriverBusScreen} />
        <Stack.Screen name="DriverStatsScreen" component={DriverStatsScreen} />
    </Stack.Navigator>
  );
};

export default DriverStack;