import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/tr';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';


const ServisStartScreen = ({ navigation, route }) => {
    const currentDateTime = moment().locale('tr').format('DD MMMM dddd HH:mm');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Servis Başladı</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateTimeText}>{currentDateTime}</Text>
            </View>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => console.log("SEFERE BAŞLA")}>
                    <Text style={styles.buttonText}>SEFERİ BİTİR</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisStudentList')}>
                    <Icon name="people" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Öğrenciler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisStartScreen')}>
                    <Icon name="map" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Harita</Text>
                </TouchableOpacity>
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
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    dateTimeContainer: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    dateTimeText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#323F4B',
    },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    studentImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    studentInfo: {
        flex: 1,
        marginRight: 20,
    },
    studentName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    studentPhoneNumber: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    studentStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    statusContainer: {
        padding: 5,
        borderRadius: 5,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: '#2E7D32',
        width: '100%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#2E7D32',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    bottomMenuItem: {
        alignItems: 'center',
    },
    bottomMenuText: {
        fontSize: 12,
        marginTop: 5,
    },
});

export default ServisStartScreen;