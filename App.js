import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/LoginScreen';
import { AuthContext } from './src/context/AuthContext'; 
import { AdminDashboardScreen } from './src/screens/admin/AdminDashboardScreen';
import { SchoolProfileScreen } from './src/screens/school/SchoolProfileScreen';
import { DriverProfileScreen } from './src/screens/driver/DriverProfileScreen';
import { ParentProfileScreen } from './src/screens/parent/ParentProfileScreen';
import { StudentProfileScreen } from './src/screens/parent/StudentProfileScreen';
import AuthProvider from './src/api/AuthProvider';
import NavigationContainerComponent from './src/components/NavigationContainer';
const Stack = createNativeStackNavigator();

function App() {


  return (
    <AuthProvider>
    <SafeAreaView style={{ flex: 1 }}>
<NavigationContainerComponent />
    </SafeAreaView>
    </AuthProvider>
  );
}

export default App;