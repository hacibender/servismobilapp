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
    console.log(auth?.authData.isAuth, "auth", auth?.authData.roles)
  if (auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (

      <NavigationContainer>
       {auth?.authData.isAuth ? ( 
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              {auth?.authData.roles.includes("ROOT") ? (
                  <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} />
              ) : auth?.authData.roles.includes("SCHOOL") ? (
                  <Stack.Screen name="SchoolProfileScreen" component={SchoolProfileScreen} />
              ) : auth?.authData.roles.includes("DRIVER") ? (
                  <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />
              ) : auth?.authData.roles.includes("PARENT") ? (
                  <Stack.Screen name="ParentProfileScreen" component={ParentProfileScreen} />
              ) : auth?.authData.roles.includes("STUDENT") ? (
                  <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
              ) : null 
            }
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name="Login" component={LoginScreen} /> 
              {/* <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />*/}
            </Stack.Navigator>
          )}
      </NavigationContainer>
  );
}

export default NavigationContainerComponent;