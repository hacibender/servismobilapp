import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { forgotPassword } from './api/api';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await forgotPassword(email);
            Alert.alert('Success', 'Password reset link sent to your email');
        } catch (error) {
            Alert.alert('Error', 'Failed to send password reset link');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Button title="Reset Password" onPress={handleForgotPassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default ForgotPasswordScreen;
