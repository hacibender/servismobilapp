import React, { useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/tr';
import Icon from 'react-native-vector-icons/MaterialIcons';


const StudentStartScreen = ({ navigation }) => {
    const currentDateTime = moment().locale('tr').format('DD MMMM dddd HH:mm');
    const [konumGorunurluk, setKonumGorunurluk] = useState(false);

    const konumGoster = () => {
        setKonumGorunurluk(true);
    };

    const sikayetEt = () => {
    };

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğrenci Takip</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateTimeText}>{currentDateTime}</Text>
            </View>
            <View>
                <View style={styles.servisInfo}>
                    <View style={styles.vehicleInfo}>
                        <Icon name="directions-bus" size={30} color="#D32F2F" />
                        <View style={styles.vehicleText}>
                            <Text style={styles.vehiclePlate}>34 ABC 34</Text>
                            <Text style={styles.vehicleNumber}>05531234567</Text>
                        </View>
                    </View>
                    <View style={styles.servisbuttonarea}>
                        <TouchableOpacity /*onPress={konumGoster}*/ style={styles.konumButonu}>
                            <Icon name="location-on" size={18} color="#2E7D32" />
                            <Text style={styles.konumText}>Konumu Göster</Text>
                        </TouchableOpacity>
                        <View style={styles.gelmiyorum}>
                            <TouchableOpacity style={styles.buttonred} onPress={openModal}>
                                <Icon name="markunread-mailbox" size={18} color="#D32F2F" style={styles.icon} />
                                <Text style={styles.buttonTextred}>Şikayet Et</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={closeModal}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Icon name="markunread-mailbox" size={50} color="#D32F2F" style={styles.icon} />
                                        <Text style={styles.modalTitle}>Şikayetiniz Nedir</Text>
                                        <Text style={styles.modalText}>Sadece Okul Yönetimi Tarafından Görünecektir</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Şikayetinizi Yazabilirsiniz">
                                        </TextInput>
                                        <View style={styles.popupbuttonarea}>
                                            <TouchableOpacity style={styles.popupbutton} onPress={closeModal}>
                                                <Text>Gönder</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </View>

                <View style={styles.bilgiler}>
                    <Text style={styles.bilgiMetni}>Servisin gelmesine <Text style={styles.bilgiTime}>30km - 34dk</Text> var</Text>
                </View>

                <View style={styles.ogrenciarea}>
                    <View style={styles.ogrenci}>
                        <Icon name="location-history" size={30} color="#D32F2F" />
                        <Text style={styles.ogrenciMetni}>Öğrenciniz</Text>
                    </View>
                    <View>
                        <TouchableOpacity /*onPress={konumGoster}*/ style={styles.konumButonu}>
                            <Icon name="location-on" size={18} color="#2E7D32" />
                            <Text style={styles.konumText}>Konumumu Göster</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity title="Şikayet Et" onPress={sikayetEt} style={styles.sikayetButonu} />

                {konumGorunurluk && (
                    <Image
                        source={{ uri: 'https://maps.google.com/maps?q=istanbul' }}
                        style={styles.konumHaritasi}
                    />
                )}
            </View>
            {/* <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('StudentStartScreen')}>
                    <Icon name="map" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Harita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person" size={24} color="#000" />
                    <Text style={styles.bottomMenuText}>Profil</Text>
                </TouchableOpacity>
            </View> */}
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
    },
    buttonred: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#F5EDED',
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gelmiyorum: {
        width: '100%'
    },
    buttonTextred: {
        color: '#D32F2F',
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
    input: {
        width: '100%',
        height: 100,
        borderColor: '#7B8794',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
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
    servisInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    vehicleInfo: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    vehicleText: {
        gap: 5,
    },
    servisbuttonarea: {
        flexDirection: 'column',
        gap: 10,
    },
    vehiclePlate: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    vehicleNumber: {
        fontWeight: 'semibold',
        fontSize: 14,
        color: '#7B8794'
    },
    bilgiler: {
        marginBottom: 20,
    },
    bilgiMetni: {
        fontSize: 16,
        color: '#7B8794'
    },
    bilgiTime: {
        fontSize: 16,
        color: '#2F80ED'
    },
    ogrenciarea: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ogrenci: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    ogrenciMetni: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    konumHaritasi: {
        width: '100%',
        height: 200,
    },
    konumButonu: {
        gap: 5,
        flexDirection: 'row',
        padding: 10,
        height: 40,
        backgroundColor: '#EDF2ED',
        borderRadius: 5,
    },
    konumText: {
        color: '#2E7D32',
        fontSize: 14,
        textAlign: 'center',
    },
    sikayetButonu: {
        backgroundColor: '#F44336',
        color: '#fff',
        borderRadius: 5,
        marginTop: 20,
    },
});

export default StudentStartScreen;
