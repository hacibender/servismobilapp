import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ServisStudentList = ({ navigation }) => {
    const students = [
        {
            id: 1,
            name: 'Ali',
            surname: 'Yılmaz',
            phoneNumber: '555 123 45 67',
            image: require('../../images/profilgorsel.png'),
            status: 'Geliyor',
        },
        {
            id: 2,
            name: 'Ayşe',
            surname: 'Demir',
            phoneNumber: '555 987 65 43',
            image: require('../../images/profilgorsel.png'),
            status: 'Belirtilmedi',
        },
        {
            id: 3,
            name: 'Emre',
            surname: 'Erdem',
            phoneNumber: '555 456 12 13',
            image: require('../../images/profilgorsel.png'),
            status: 'Gelmiyor',
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.studentItem}>
            <Image source={item.image} style={styles.studentImage} />
            <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{item.name} {item.surname}</Text>
                <Text style={styles.studentPhoneNumber}>{item.phoneNumber}</Text>
            </View>
            <View style={[styles.statusContainer, getStatusColor(item.status)]}>
                <Text style={styles.studentStatus}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Geliyor':
                return { backgroundColor: 'green' };
            case 'Gelmiyor':
                return { backgroundColor: 'red' };
            case 'Belirtilmedi':
                return { backgroundColor: 'orange' };
            default:
                return { backgroundColor: 'transparent' };
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğrenci Listesi</Text>

            <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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

export default ServisStudentList;