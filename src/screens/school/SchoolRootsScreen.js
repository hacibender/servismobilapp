import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, PermissionsAndroid, ScrollView, FlatList } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client';
import SchoolBottomNavBar from './SchoolBottomNavBar';
import AdminBottomNavBar from '../admin/AdminBottomNavBar';


const schoolData = [
    {
        id: 1,
        rota: {
            okul: 'Gülbahar Mahallesi Rotası',
            ogrenciSayisi: '14 Öğrenci',
            sofor: 'Ali Şimşek',
            plaka: '34 ABC 34',
            gunler: 'Haftaiçi Her Gün'
        },
    },
    {
        id: 2,
        rota: {
            okul: 'Gülbahar Mahallesi Rotası',
            ogrenciSayisi: '14 Öğrenci',
            sofor: 'Ali Şimşek',
            plaka: '34 ABC 34',
            gunler: 'Haftaiçi Her Gün'
        },
    },
    {
        id: 3,
        rota: {
            okul: 'Gülbahar Mahallesi Rotası',
            ogrenciSayisi: '14 Öğrenci',
            sofor: 'Ali Şimşek',
            plaka: '34 ABC 34',
            gunler: 'Haftaiçi Her Gün'
        },
    },
    {
        id: 4,
        rota: {
            okul: 'Gülbahar Mahallesi Rotası',
            ogrenciSayisi: '14 Öğrenci',
            sofor: 'Ali Şimşek',
            plaka: '34 ABC 34',
            gunler: 'Haftaiçi Her Gün'
        },
    },
    {
        id: 5,
        rota: {
            okul: 'Gülbahar Mahallesi Rotası',
            ogrenciSayisi: '14 Öğrenci',
            sofor: 'Ali Şimşek',
            plaka: '34 ABC 34',
            gunler: 'Haftaiçi Her Gün'
        },
    },
    {
        id: 6,
        rota: {
            okul: 'Gülbahar Mahallesi Rotası',
            ogrenciSayisi: '14 Öğrenci',
            sofor: 'Ali Şimşek',
            plaka: '34 ABC 34',
            gunler: 'Haftaiçi Her Gün'
        },
    },
];



const SchoolRootsScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const socketRef = useRef(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    const handleSavePassword = () => {
        console.log('Eski Şifre:', oldPassword);
        console.log('Yeni Şifre:', newPassword);
    };
    //   useEffect(() => {
    //     // Connect to your WebSocket server when the component mounts
    //     socket.current = io('YOUR_WEBSOCKET_SERVER_URL'); 

    //     // Event listener for location updates
    //     socket.current.on("connect", () => {
    //       console.log("Connected to the websocket server"); 
    //     });
    //   }, []);

    //   useEffect(() => {
    //     const requestLocationPermission = async () => {
    //       if (Platform.OS === 'android') {
    //         try {
    //           const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //               title: 'Location Permission',
    //               message: 'This app needs access to your location for tracking.',
    //               buttonNeutral: 'Ask Me Later',
    //               buttonNegative: 'Cancel',
    //               buttonPositive: 'OK',
    //             },
    //           );
    //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log('You can use the location');
    //             startLocationTracking();
    //           } else {
    //             console.log('Location permission denied');
    //           }
    //         } catch (err) {
    //           console.warn(err);
    //         }
    //       } else {
    //         startLocationTracking();
    //       }
    //     };

    //     requestLocationPermission();

    //     // Clean up: Stop tracking when the component unmounts
    //     return () => {
    //       if (locationWatcher) Geolocation.clearWatch(locationWatcher);
    //     };
    //   }, []);

    //   const startLocationTracking = () => {
    //     const locationWatcher = Geolocation.watchPosition(
    //       (position) => {
    //         const { latitude, longitude } = position.coords;
    //         setLocation({ latitude, longitude });

    //         // Send location updates to your WebSocket server
    //         socket.current.emit('driverLocationUpdate', { 
    //           latitude,
    //           longitude 
    //         });
    //       },
    //       (error) => {
    //         console.error('Location tracking error:', error);
    //       },
    //       { highAccuracy: true, distanceFilter: 10 }, // Adjust accuracy and distance filter as needed
    //     );
    //   };


    const renderItem = ({ item }) => {
        const { rota } = item;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SchoolRootScreen')} style={styles.itemContainer}>
                <Text style={styles.itemText}>{rota.okul}</Text>
                <Text style={styles.itemText}>{rota.ogrenciSayisi}</Text>
                <Text style={styles.itemText}>Şoför: {rota.sofor}</Text>
                <Text style={styles.itemText}>Plaka: {rota.plaka} </Text>
                <Text style={styles.itemText}>Günler: {rota.gunler} </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screenContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ROTALAR</Text>
                    <FlatList
                        data={schoolData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </ScrollView>
            <View style={styles.bottomMenu}>
                <SchoolBottomNavBar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    bottomMenu: {
        justifyContent: 'space-between',
        borderTopColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        gap: 8,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileText: {
        fontSize: 14,
        fontWeight: '300',
        marginVertical: 3,
        color: '#666',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 8,
        color: '#444',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    itemText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
});

export default SchoolRootsScreen;