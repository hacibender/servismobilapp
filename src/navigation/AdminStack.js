// AdminStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AdminTrackingScreen } from '../screens/admin/AdminTrackingScreen';
import { AdminControlScreen } from '../screens/admin/AdminControlScreen';
import { AdminStatsScreen } from '../screens/admin/AdminStatsScreen';
import { AdminReportsScreen } from '../screens/admin/AdminReportsScreen';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminTrackingScreen" component={AdminTrackingScreen} />
        <Stack.Screen name="AdminControlScreen" component={AdminControlScreen} />
        <Stack.Screen name="AdminStatsScreen" component={AdminStatsScreen} />
        <Stack.Screen name="AdminReportsScreen" component={AdminReportsScreen} />
    </Stack.Navigator>
  );
};

export default AdminStack;