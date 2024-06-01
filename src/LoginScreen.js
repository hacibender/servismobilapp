import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [consent, setConsent] = useState(false);
    const [userType, setUserType] = useState('');

    const handleLogin = () => {
        console.log('Giriş Yapılıyor...', username, password);

        if (username === 'Servis' && password === 'Servis') {
            setUserType('Servis');
        } else if (username === 'Ogrenci' && password === 'Ogrenci') {
            setUserType('Öğrenci');
        } else if (username === 'Veli' && password === 'Veli') {
            setUserType('Veli');
        } else {
            alert('Hatalı kullanıcı adı veya şifre!');
        }

        if (userType) {
            const userScreenMapping = {
                Servis: 'ServisHomeScreen',
                Öğrenci: 'StudentHomeScreen',
                Veli: 'ParentHome',
            };
            const targetScreen = userScreenMapping[userType];
            navigation.navigate(targetScreen);
        }
    };

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
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#7B8794" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, rememberMe && styles.checked]}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    {rememberMe && <Icon name="check" size={15} color="#fff" />}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>Beni Hatırla</Text>
            </View>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, consent && styles.checked]}
                    onPress={() => setConsent(!consent)}
                >
                    {consent && <Icon name="check" size={15} color="#fff" />}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>Rıza Metnini Okudum Onaylıyorum</Text>
            </View>

            <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleLogin}>
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
        // Buraya logo stilini ekleyebilirsiniz
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
        alignSelf: 'flex-start', // Bu satırları sola yaslamak için ekledim
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
