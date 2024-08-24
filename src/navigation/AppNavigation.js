// AppNavigation.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

// Import your Stack Navigators
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import SchoolStack from './SchoolStack';
import DriverStack from './DriverStack';
import ParentStack from './ParentStack';
import StudentStack from './StudentStack';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { authState, loading } = useContext(AuthContext);
  console.log('AppNavigation authData', authState);

  if (loading) {
    // You can show a loading indicator here
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authState.isAuth ? (
          // User is not authenticated, show AuthStack
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          // User is authenticated, show appropriate stack based on roles
          <>
            {authState.roles.includes('ROOT') && (
              <Stack.Screen name="Admin" component={AdminStack} />
            )}
            {authState.roles.includes('SCHOOL') && (
              <Stack.Screen name="School" component={SchoolStack} />
            )}
            {authState.roles.includes('DRIVER') && (
              <Stack.Screen name="Driver" component={DriverStack} />
            )}
            {authState.roles.includes('PARENT') && (
              <Stack.Screen name="Parent" component={ParentStack} />
            )}
            {authState.roles.includes('STUDENT') && (
              <Stack.Screen name="Student" component={StudentStack} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;