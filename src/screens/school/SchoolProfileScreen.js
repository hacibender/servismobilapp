import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, PermissionsAndroid, FlatList, ScrollView } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client';

const routeData = [
    {
        id: 1,
        rota: {
            okul: 'Levent College',
            servis: '1A Sabah Servisi',
            plaka: '34 ABC 32',
            zaman: '06:10 - 07:50',
            gunler: 'Haftaiçi Her Gün'
        },
        school: 'Levent College'
    },
    {
        id: 2,
        rota: {
            okul: 'Levent College',
            servis: '1A Sabah Servisi',
            plaka: '34 ABC 32',
            zaman: '06:10 - 07:50',
            gunler: 'Haftaiçi Her Gün'
        },
        school: 'Levent College'
    },
    {
        id: 3,
        rota: {
            okul: 'Levent College',
            servis: '1A Sabah Servisi',
            plaka: '34 ABC 32',
            zaman: '06:10 - 07:50',
            gunler: 'Haftaiçi Her Gün'
        },
        school: 'Levent College'
    },
    {
        id: 4,
        rota: {
            okul: 'Levent College',
            servis: '1A Sabah Servisi',
            plaka: '34 ABC 32',
            zaman: '06:10 - 07:50',
            gunler: 'Haftaiçi Her Gün'
        },
        school: 'Levent College'
    },
];

const renderRouteItem = ({ item }) => {
    const { rota } = item;
    return (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemSchoolText}>{rota.okul}</Text>
            <Text style={styles.itemFirstText}>{rota.servis} {rota.plaka}</Text>
            <Text style={styles.itemText}>{rota.zaman} {rota.gunler}</Text>
        </TouchableOpacity>
    );
};

const SchollProfileScreen = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.profileImageContainer}>
                    <Image source={require('../../images/profilgorsel.png')} style={styles.profileImage} />
                    <View style={styles.imageButtons}>
                        <TouchableOpacity style={styles.imageButton}>
                            <Text style={styles.imageButtonTextgreen}>Fotoğrafı Değiştir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageButton}>
                            <Text style={styles.imageButtonTextred}>Fotoğrafı Sil</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sliderButtons}>
                    <TouchableOpacity
                        style={[styles.sliderButton, activeTab === 'profile' && styles.activeButton]}
                        onPress={() => setActiveTab('profile')}
                    >
                        <Text style={styles.sliderButtonText}>Profil Bilgileri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sliderButton, activeTab === 'password' && styles.activeButton]}
                        onPress={() => setActiveTab('password')}
                    >
                        <Text style={styles.sliderButtonText}>Şifre İşlemleri</Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'profile' && (
                    <View style={[styles.section, styles.whiteBackground]}>
                        <Text style={styles.sectionTitle}>Okul Bilgileri</Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Okul Adı:</Text>
                            <Text style={styles.infoText}>JohnDoe</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.infoText}>johndoe@example.com</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Telefon:</Text>
                            <Text style={styles.infoText}>555 123 45 67</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Adres:</Text>
                            <Text style={styles.infoText}>Davutpaşa cad. Serçekale sok. No:9 Kat:3 Topkapı</Text>
                        </View>
                        <View style={styles.additionalInfo}>
                            <Text style={styles.label}>Araç Sayısı:</Text>
                            <Text style={styles.additionalInfoText}>13</Text>
                        </View>
                        <View style={styles.additionalInfo}>
                            <Text style={styles.label}>Öğrenci Sayısı:</Text>
                            <Text style={styles.additionalInfoText}>420</Text>
                        </View>
                        <View style={styles.additionalInfo}>
                            <Text style={styles.label}>Veli Sayısı:</Text>
                            <Text style={styles.additionalInfoText}>420</Text>
                        </View>
                        <View style={styles.additionalInfo}>
                            <Text style={styles.label}>Şoför Sayısı:</Text>
                            <Text style={styles.additionalInfoText}>24</Text>
                        </View>
                    </View>
                )}

                {activeTab === 'profile' && (
                    <View style={[styles.section, styles.whiteBackground]}>
                        <Text style={styles.sectionTitle}>ROTALAR</Text>
                        <FlatList
                            data={routeData}
                            renderItem={renderRouteItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                )}
                {activeTab === 'profile' && (
                    <View style={[styles.section, styles.whiteBackground]}>
                        <Text style={styles.sectionTitle}>Güzergahlar</Text>
                        <FlatList
                            data={routeData}
                            renderItem={renderRouteItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                )}

                {activeTab === 'password' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Şifre İşlemleri</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="#7B8794" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Eski Şifre"
                                secureTextEntry={true}
                                value={oldPassword}
                                onChangeText={setOldPassword}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="#7B8794" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Yeni Şifre"
                                secureTextEntry={true}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
                            <Text style={styles.buttonText}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisHomeScreen')}>
                    <Icon name="location-on" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Canlı Takip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisStudentList')}>
                    <Icon name="people" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Veli/Öğrenci</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisHomeScreen')}>
                    <Icon name="map" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Rota/Güzergah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="analytics" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>İstatistikler</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 120, // Bottom menu alanı için padding ekleyelim
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
    imageButtons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
    },
    imageButton: {
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageButtonTextgreen: {
        color: '#2E7D32',
        fontSize: 16,
    },
    imageButtonTextred: {
        color: '#D32F2F',
        fontSize: 16,
    },
    sliderButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sliderButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeButton: {
        borderBottomColor: '#007AFF',
    },
    sliderButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323F4B',
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#323F4B',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    infoText: {
        color: '#7B8794',
    },
    additionalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    additionalInfoText: {
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#333',
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
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
        width: '50%', // Or adjust as needed
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Her iki yana tamamen uzanacak şekilde ayarlandı
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        gap: 8,
    },
    bottomMenuItem: {
        alignItems: 'center',
    },
    bottomMenuText: {
        fontSize: 12,
        marginTop: 5,
        color: '#333',
    },
    whiteBackground: {
        backgroundColor: '#FFF',
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
        fontSize: 13,
        color: '#555',
        marginBottom: 4,
    },
    itemSchoolText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#555',
        marginBottom: 4,
    },
    itemFirstText: {
        fontSize: 15,
        fontWeight: '300',
        marginBottom: 4,
    },
});

export default SchollProfileScreen;