import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentProfileScreen from '../screens/parent/StudentProfileScreen';

const Stack = createNativeStackNavigator();

const StudentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
    </Stack.Navigator>
  );
};

export default StudentStack;