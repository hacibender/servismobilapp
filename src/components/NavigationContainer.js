import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import { useAuth } from '../context/AuthContext'; 
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { SchoolProfileScreen } from '../screens/school/SchoolProfileScreen';
import { DriverProfileScreen } from '../screens/driver/DriverProfileScreen';
import { ParentProfileScreen } from '../screens/parent/ParentProfileScreen';
import { StudentProfileScreen } from '../screens/parent/StudentProfileScreen';
import AuthProvider from '../api/AuthProvider';
const Stack = createNativeStackNavigator();

function NavigationContainerComponent() {
    const auth   = useAuth(); 

  if (auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>

          

                  <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />



        </Stack.Navigator>
      </NavigationContainer>

  );
}

export default NavigationContainerComponent;