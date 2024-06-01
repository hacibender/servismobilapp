import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ParentHome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Parent Home</Text>

            <View style={styles.content}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Harita"
                        onPress={() => navigation.navigate('ParentHome')}
                        style={styles.buttonStyle}
                    />
                    <Button
                        title="Profil"
                        onPress={() => navigation.navigate('Profile')}
                        style={styles.buttonStyle}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    buttonStyle: {
        marginLeft: 10,
    },
});

export default ParentHome;
