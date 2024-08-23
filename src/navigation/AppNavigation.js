import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from '../api/AuthProvider';
import AuthStack from './AuthStack'; // Login, ForgotPassword, etc.
import AdminStack from './AdminStack';
import SchoolStack from './SchoolStack';
import DriverStack from './DriverStack';
import ParentStack from './ParentStack';
import StudentStack from './StudentStack';

import { useAuth } from '../context/AuthContext';

const AppNavigation = () => {
  const { user } = useAuth(); // Assuming your AuthContext provides user data

  return (
    <NavigationContainer>
      {user ? (
        // Conditionally render based on user role
        user.role === 'admin' ? (
            <AdminStack />
        ) : user.role === 'school' ? (
            <SchoolStack />
        ) : user.role === 'driver' ? (
            <DriverStack />
        ) : user.role === 'parent' ? (
            <ParentStack />
        ) : user.role === 'student' ? (
            <StudentStack />
        ) : // ... other roles
        null
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;