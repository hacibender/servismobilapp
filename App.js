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

const Stack = createNativeStackNavigator();

function App() {
  const auth = useContext(AuthContext);
  const loading  = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {auth?.authData?.isAuth ? ( 
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              {auth?.authData.roles.includes("ROOT") ? (
                // Admin Routes
                <Stack.Group>
                  <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} />
                  {/* Other admin routes */}
                </Stack.Group>
              ) : auth?.authData.roles.includes("SCHOOL") ? (
                // School Routes
                <Stack.Group>
                  <Stack.Screen name="SchoolProfileScreen" component={SchoolProfileScreen} />
                  {/* Other school routes */}
                </Stack.Group>
              ) : auth?.authData.roles.includes("DRIVER") ? (
                // Driver Routes
                <Stack.Group>
                  <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />
                  {/* Other driver routes */}
                </Stack.Group>
              ) : auth?.authData.roles.includes("PARENT") ? (
                // Parent Routes
                <Stack.Group>
                  <Stack.Screen name="ParentProfileScreen" component={ParentProfileScreen} />
                  {/* Other parent routes */}
                </Stack.Group>
              ) : auth?.authData.roles.includes("STUDENT") ? (
                // Student Routes
                <Stack.Group>
                  <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
                  {/* Other student routes */}
                </Stack.Group>
              ) : null 
            }
            </Stack.Navigator>
          ) : (
            // Auth Routes
            <Stack.Group>
             {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
             <Stack.Screen name="DriverProfileScreen" component={DriverProfileScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;