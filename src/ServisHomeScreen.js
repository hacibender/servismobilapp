import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/tr';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = '<AIzaSyBHQRCFiRddxgqe52RO0ua3E21RwyAwwvU>';

const ServisHomeScreen = ({ navigation }) => {
    const currentDateTime = moment().locale('tr').format('DD MMMM dddd HH:mm');
    const [modalVisible, setModalVisible] = useState(false);

    const [startingPoint, setStartingPoint] = useState({
        latitude: 41.0315,
        longitude: 28.9761,
    });

    const studentsLocations = [
        { latitude: 41.0328, longitude: 28.9783 },
        { latitude: 41.0389, longitude: 28.9648 },
    ];

    const destinationPoint = { latitude: 41.0595, longitude: 28.9216 };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Servis Home</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} initialRegion={{
                    latitude: 41.0315,
                    longitude: 28.9761,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}>
                    <Marker coordinate={startingPoint} title="Başlangıç Noktası" />
                    {studentsLocations.map((location, index) => (
                        <Marker
                            key={index}
                            coordinate={location}
                            title={`Öğrenci ${index + 1}`}
                        />
                    ))}
                    <Marker coordinate={destinationPoint} title="Varış Noktası" />
                    <MapViewDirections
                        origin={startingPoint}
                        waypoints={studentsLocations}
                        destination={destinationPoint}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                    />
                </MapView>
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateTimeText}>{currentDateTime}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.gelmiyorum}>
                    <TouchableOpacity style={styles.buttonred} onPress={openModal}>
                        <Text style={styles.buttonTextred}>Sefere Başla</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.popupbutton} onPress={() => {
                                    navigation.navigate('ServisStartScreen');
                                    closeModal();
                                }}>
                                    <Text>Sefer No:1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.popupbutton} onPress={() => {
                                    navigation.navigate('ServisStartScreen');
                                    closeModal();
                                }}>
                                    <Text>Sefer No:2</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
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
        </View >
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
    buttonred: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#fff',
        borderColor: '#2E7D32',
        borderWidth: 1,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gelmiyorum: {
        width: '100%'
    },
    buttonTextred: {
        color: '#2E7D32',
        fontSize: 14,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        gap: 20,
    },
    modalTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    modalText: {
        fontWeight: 'semibold',
        fontSize: 16,
        textAlign: 'center'
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

export default ServisHomeScreen;