import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; 
import { AuthContext } from '../../context/AuthContext'; // Assuming your AuthContext is in a 'hoc' folder

const LoginScreen = () => {
  const navigation = useNavigation(); 

  const auth   = useContext(AuthContext); 
  const login  = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Redirect based on authentication status and role
    if (auth?.authData && auth?.authData.isAuth) { // Check if auth?.authData is truthy
      if (auth?.authData.roles.includes("ROOT")) {
        navigation.navigate('AdminDashboardScreen'); 
      } else if (auth?.authData.roles.includes("SCHOOL")) { // Assuming "DRIVER" role
        navigation.navigate('SchoolProfileScreen'); 
      } else if (auth?.authData.roles.includes("DRIVER")) { // Assuming "DRIVER" role
        navigation.navigate('DriverProfileScreen'); 
      } else if (auth?.authData.roles.includes("PARENT")) { // Assuming "DRIVER" role
        navigation.navigate('ParentProfileScreen'); 
      } else if (auth?.authData.roles.includes("STUDENT")) { // Assuming "DRIVER" role
        navigation.navigate('StudentProfileScreen'); 
      } else {
        // Handle other roles or default navigation if needed
      }
    }
  }, [auth?.authData, navigation]); 

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Login Error", "Invalid email or password");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Your Logo Here */}
      </View>
      <View style={styles.inputContainer}>
        <Icon name="people" size={20} color="#7B8794" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#7B8794" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity 
        style={[styles.button, { width: '100%' }]} 
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <Text style={styles.companyText}>Developed by YakınBoğaz</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        height: 100,
        width: 80,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: '#7B8794',
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#2F80ED',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    forgotPassword: {
        marginTop: 10,
        textAlign: 'center',
        color: '#7B8794',
    },
    companyText: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 20,
        color: '#7B8794',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#2F80ED',
        borderColor: '#2F80ED',
    },
    checkboxText: {
        fontSize: 16,
        color: '#7B8794',
    },
});

export default LoginScreen;
