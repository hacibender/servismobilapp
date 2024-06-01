import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/tr';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StudentPopUp from './studentpopup';

const StudentHomeScreen = ({ navigation }) => {
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
            <Text style={styles.title}>Student Home</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateTimeText}>{currentDateTime}</Text>
            </View>
            <View style={styles.studentquestion}>
                <Text style={styles.studentquestionText}>Bugün Okula Gelecek Misin?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttongreen} onPress={() => navigation.navigate('StudentStartScreen')}>
                    <Text style={styles.buttonTextgreen}>Geliyorum</Text>
                </TouchableOpacity>
                <View style={styles.gelmiyorum}>
                    <TouchableOpacity style={styles.buttonred} onPress={openModal}>
                        <Text style={styles.buttonTextred}>Gelmiyorum</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Icon name="warning" size={50} color="#D32F2F" style={styles.icon} />
                                <Text style={styles.modalTitle}>Servise Katılmak İstemediğinize Emin Misiniz?</Text>
                                <View style={styles.popupbuttonarea}>
                                    <TouchableOpacity style={styles.popupbutton} onPress={closeModal}>
                                        <Text>Evet</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.popupbutton} onPress={closeModal}>
                                        <Text>Hayır</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('StudentHomeScreen')}>
                    <Icon name="map" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Harita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Profil</Text>
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
    studentquestion: {
        marginBottom: 20,
    },
    studentquestionText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
        gap: 10,
    },
    buttongreen: {
        borderWidth: 1,
        borderColor: '#2E7D32',
        width: '48%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gelmiyorum: {
        width: '100%'
    },
    buttonred: {
        borderWidth: 1,
        borderColor: '#D32F2F',
        width: '48%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextgreen: {
        color: '#2E7D32',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextred: {
        color: '#D32F2F',
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

export default StudentHomeScreen;
