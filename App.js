import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServisHomeScreen from './src/ServisHomeScreen';
import LoginScreen from './src/LoginScreen';
import ServisStudentList from './src/ServisStudentList';
import Profile from './src/Profile';
import StudentHomeScreen from './src/StudentHomeScreen';
import ParentHome from './src/ParentHome';
import ServisStartScreen from './src/ServisStartScreen';
import StudentStartScreen from './src/StudentStartScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >

          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Group screenOptions={{ title: 'Servis Kullanıcısı' }}>
            <Stack.Screen name='ServisHomeScreen' component={ServisHomeScreen} />
            <Stack.Screen name='ServisStudentList' component={ServisStudentList} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='ServisStartScreen' component={ServisStartScreen} />
          </Stack.Group>

          <Stack.Group screenOptions={{ title: 'Öğrenci Kullanıcısı' }}>
            <Stack.Screen name='StudentHomeScreen' component={StudentHomeScreen} />
            <Stack.Screen name='StudentStartScreen' component={StudentStartScreen} />
          </Stack.Group>

          <Stack.Group screenOptions={{ title: 'Veli Kullanıcısı' }}>
            <Stack.Screen name='ParentHome' component={ParentHome} />
          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
