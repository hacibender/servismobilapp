import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    const handleSavePassword = () => {
        console.log('Eski Şifre:', oldPassword);
        console.log('Yeni Şifre:', newPassword);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image source={require('./images/profilgorsel.png')} style={styles.profileImage} />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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

export default ProfileScreen;
