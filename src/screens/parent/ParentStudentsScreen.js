import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import MapView from '../../components/MapView'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const ParentStudentsScreen = ({ navigation }) => {
    const [driverLocations, setDriverLocations] = useState([]);
    const [driverLocation, setDriverLocation] = useState(null);
    const socket = useRef();
    const mapRef = useRef(null); // Reference to the MapView
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    const handleSavePassword = () => {
        console.log('Eski Şifre:', oldPassword);
        console.log('Yeni Şifre:', newPassword);
    };
  useEffect(() => {
    // Connect to your WebSocket server when the component mounts
    socket.current = io('wss://rest-j2kjfrifbq-ez.a.run.app/ws'); 

    socket.current.on('connect', () => {
      console.log('Connected to the websocket server'); 
    });

    // Listen for location updates from the driver
    socket.current.on('driverLocationUpdate', (location) => {
      setDriverLocation(location); 

      // Optional: Animate map to the new location smoothly
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,  // Adjust zoom as needed
          longitudeDelta: 0.01, 
        }, 1000); // Animation duration in milliseconds
      }
    });

    return () => {
      // Disconnect from the WebSocket server when the component unmounts
      socket.current.disconnect(); 
    };
  }, []);

  return (
    <View>
    <View style={styles.container}>
      <MapView
        ref={mapRef} 
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Default initial location (replace with a relevant location)
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocation && ( 
          <Marker
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            }}
            title="School Bus" // You can customize the marker
          />
        )}
      </MapView>
    </View>
            <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image source={require('../../images/profilgorsel.png')} style={styles.profileImage} />
                <View style={styles.imageButtons}>
                    <TouchableOpacity style={styles.imageButton}>
                        <Text style={styles.imageButtonTextgreen}>Parent Fotoğrafı Değiştir</Text>
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
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
                    <Text>Kullanıcı Adı: JohnDoe</Text>
                    <Text>Email: johndoe@example.com</Text>
                    <Text>Telefon: 555 123 45 67</Text>
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

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisStudentList')}>
                    <Icon name="people" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Öğrenciler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('ServisHomeScreen')}>
                    <Icon name="map" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Harita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Profil</Text>
                </TouchableOpacity>
            </View>
            <MapView
        initialRegion={{ /* ... */ }}
        markersData={driverLocations} 
      />
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
    map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    },
    imageButton: {
        marginHorizontal: 10,
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#323F4B',
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
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
    bottomMenuItem: {
        alignItems: 'center',
    },
    bottomMenuText: {
        fontSize: 12,
        marginTop: 5,
    },
});

export default ParentStudentsScreen;