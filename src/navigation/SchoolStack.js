import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SchoolProfileScreen from '../screens/school/SchoolProfileScreen';
import SchoolRoutesScreen from '../screens/school/SchoolRootsScreen';
import SchoolRouteScreen from '../screens/school/SchoolRootScreen';
import SchoolUsersScreen from '../screens/school/SchoolUsersScreen';
import SchoolUserScreen from '../screens/school/SchoolUserScreen';
import SchoolBusesScreen from '../screens/school/SchoolBusesScreen';
import SchoolDriversScreen from '../screens/school/SchoolDriversScreen';

const Stack = createNativeStackNavigator();

const SchoolStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="SchoolProfileScreen" component={SchoolProfileScreen} />
        <Stack.Screen name="SchoolRoutesScreen" component={SchoolRoutesScreen} />
        <Stack.Screen name="SchoolRouteScreen" component={SchoolRouteScreen} />
        <Stack.Screen name="SchoolUsersScreen" component={SchoolUsersScreen} />
        <Stack.Screen name="SchoolUserScreen" component={SchoolUserScreen} />
        <Stack.Screen name="SchoolBusesScreen" component={SchoolBusesScreen} />
        <Stack.Screen name="SchoolDriversScreen" component={SchoolDriversScreen} />
    </Stack.Navigator>
  );
};

export default SchoolStack;