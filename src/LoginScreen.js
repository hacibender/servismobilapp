import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './hoc/AuthContext';


const LoginScreen = ({ navigation }) => {
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {/* Logo buraya eklenecek */}
            </View>

            <View style={styles.inputContainer}>
                <Icon name="people" size={20} color="#7B8794" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Kullanıcı Adı"
                    keyboardType="email-address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#7B8794" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    secureTextEntry={true}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </View>

            <TouchableOpacity style={[styles.button, { width: '100%' }]} onClick={() => { auth.login(email, password); }}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>

            <Text style={styles.forgotPassword}>Şifrenizi mi unuttunuz?</Text>

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
