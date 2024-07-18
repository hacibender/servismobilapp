import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './src/api/AuthProvider';
import LoginScreen from './src/screens/login/LoginScreen';
import { AdminDashboardScreen } from './src/screens/admin/AdminDashboardScreen';
import { AdminTrackingScreen } from './src/screens/admin/AdminTrackingScreen';
import { AdminControlScreen } from './src/screens/admin/AdminControlScreen';
import { AdminStatsScreen } from './src/screens/admin/AdminStatsScreen';
import { AdminReportsScreen } from './src/screens/admin/AdminReportsScreen';
import ForgotPasswordScreen from './src/screens/login/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/login/ResetPasswordScreen';

import SchoolProfileScreen from './src/screens/school/SchoolProfileScreen';
import SchoolRootsScreen from './src/screens/school/SchoolRootsScreen';
import SchoolRootScreen from './src/screens/school/SchoolRootScreen';
import SchoolUsersScreen from './src/screens/school/SchoolUsersScreen';
import SchoolUserScreen from './src/screens/school/SchoolUserScreen';
import SchoolBusesScreen from './src/screens/school/SchoolBusesScreen';
import SchoolDriversScreen from './src/screens/school/SchoolDriversScreen';

import DriverProfileScreen from './src/screens/driver/DriverProfileScreen';
import DriverBusScreen from './src/screens/driver/DriverBusScreen';
import DriverRootScreen from './src/screens/driver/DriverRootScreen';
import DriverStatsScreen from './src/screens/driver/DriverStatsScreen';

import ParentProfileScreen from './src/screens/parent/ParentProfileScreen';
import ParentStudentsScreen from './src/screens/parent/ParentStudentsScreen';
import ParentRootScreen from './src/screens/parent/ParentRootScreen';
import ParentStatsScreen from './src/screens/parent/ParentStatsScreen';
import StudentProfileScreen from './src/screens/parent/StudentProfileScreen';

import { useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="StudentProfileScreen">
            <Stack.Group>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
              <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} />
              <Stack.Screen name="AdminTrackingScreen" component={AdminTrackingScreen} />
              <Stack.Screen name="AdminControlScreen" component={AdminControlScreen} />
              <Stack.Screen name="AdminStatsScreen" component={AdminStatsScreen} />
              <Stack.Screen name="AdminReportsScreen" component={AdminReportsScreen} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="SchoolProfileScreen" component={SchoolProfileScreen} />
              <Stack.Screen name="SchoolRootsScreen" component={SchoolRootsScreen} />
              <Stack.Screen name="SchoolRootScreen" component={SchoolRootScreen} />
              <Stack.Screen name="SchoolUsersScreen" component={SchoolUsersScreen} />
              <Stack.Screen name="SchoolUserScreen" component={SchoolUserScreen} />
              <Stack.Screen name="SchoolBusesScreen" component={SchoolBusesScreen} />
              <Stack.Screen name="SchoolDriversScreen" component={SchoolDriversScreen} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />
              <Stack.Screen name="DriverRootScreen" component={DriverRootScreen} />
              <Stack.Screen name="DriverBusScreen" component={DriverBusScreen} />
              <Stack.Screen name="DriverStatsScreen" component={DriverStatsScreen} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="ParentProfileScreen" component={ParentProfileScreen} />
              <Stack.Screen name="ParentStudentsScreen" component={ParentStudentsScreen} />
              <Stack.Screen name="ParentRootScreen" component={ParentRootScreen} />
              <Stack.Screen name="ParentStatsScreen" component={ParentStatsScreen} />
              <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;
