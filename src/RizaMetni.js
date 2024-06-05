import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RizaMetni = ({ navigation }) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Rıza Metni</Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    Uzun metin buraya gelecek. Bu metin çok uzun olduğu için kullanıcılar
                    ekran boyutundan daha fazla içerik görmek için kaydırabilirler.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    Uzun metin buraya gelecek. Bu metin çok uzun olduğu için kullanıcılar
                    ekran boyutundan daha fazla içerik görmek için kaydırabilirler.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    Uzun metin buraya gelecek. Bu metin çok uzun olduğu için kullanıcılar
                    ekran boyutundan daha fazla içerik görmek için kaydırabilirler.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LocationSelect')}>
                        <Text style={styles.buttonText}>Okudum, Onaylıyorum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    text: {
        fontWeight: 'regular',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#2F80ED',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
});

export default RizaMetni;
