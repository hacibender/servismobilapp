import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/tr';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StudentPopUp from '../parent/studentpopup';

const LocationConfirmation = ({ navigation }) => {
    const currentDateTime = moment().locale('tr').format('DD MMMM dddd HH:mm');

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location Confirmation</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Adresinizi Lütfen Yazınız"
                >

                </TextInput>
            </View>
            <View style={styles.gelmiyorum}>
                <TouchableOpacity style={styles.buttonred} onPress={openModal}>
                    <Text style={styles.buttonTextred}>Onayla</Text>
                </TouchableOpacity>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Icon name="warning" size={50} color="#2F80ED" style={styles.icon} />
                            <Text style={styles.modalTitle}>Adresinizin Doğru Olduğuna Emin Misiniz?</Text>
                            <View style={styles.popupbuttonarea}>
                                <TouchableOpacity
                                    style={styles.popupbutton}
                                    onPress={() => {
                                        navigation.navigate('StudentHomeScreen');
                                        closeModal();
                                    }}>
                                    <Text style={styles.popupbuttontext}>Evet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.popupbutton} onPress={closeModal}>
                                    <Text style={styles.popupbuttontext}>Hayır</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,

    },
    gelmiyorum: {
        width: '100%',
        paddingBottom: 20,
    },
    buttonred: {
        borderWidth: 1,
        borderColor: '#2F80ED',
        backgroundColor: '#2F80ED',
        width: '100%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextred: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    popupbuttonarea: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20
    },
    popupbutton: {
        backgroundColor: '#2F80ED',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '70%'
    },
    popupbuttontext: {
        color: '#fff'
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

export default LocationConfirmation;
