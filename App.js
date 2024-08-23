import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './src/context/AuthContext';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigation />
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = NativeWindStyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;