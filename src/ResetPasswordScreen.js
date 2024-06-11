import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { resetPassword } from './api/api';

const ResetPasswordScreen = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await resetPassword(token, newPassword);
            Alert.alert('Success', 'Password has been reset');
        } catch (error) {
            Alert.alert('Error', 'Failed to reset password');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Reset Token"
                value={token}
                onChangeText={setToken}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <Button title="Reset Password" onPress={handleResetPassword} />
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

export default ResetPasswordScreen;
