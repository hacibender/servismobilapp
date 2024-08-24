import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParentProfileScreen from '../screens/parent/ParentProfileScreen';
import ParentStudentsScreen from '../screens/parent/ParentStudentsScreen';
import ParentRootScreen from '../screens/parent/ParentRootScreen';
import ParentStatsScreen from '../screens/parent/ParentStatsScreen';
import StudentProfileScreen from '../screens/parent/StudentProfileScreen';

const Stack = createStackNavigator();

const ParentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="ParentProfileScreen" component={ParentProfileScreen} />
        <Stack.Screen name="ParentStudentsScreen" component={ParentStudentsScreen} />
        <Stack.Screen name="ParentRootScreen" component={ParentRootScreen} />
        <Stack.Screen name="ParentStatsScreen" component={ParentStatsScreen} />
        <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
    </Stack.Navigator>
  );
};

export default ParentStack;