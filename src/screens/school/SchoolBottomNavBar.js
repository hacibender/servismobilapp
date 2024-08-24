import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SchoolBottomNavBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolProfileScreen')} style={styles.navItem}>
                <Icon name="person" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolRootsScreen')} style={styles.navItem}>
                <Icon name="directions" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Rotalar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolBusesScreen')} style={styles.navItem}>
                <Icon name="directions-bus" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Araçlar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolUsersScreen')} style={styles.navItem}>
                <Icon name="people" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Veliler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.navItem}>
                <Icon name="insert-drive-file" size={24} color="#1e90ff" />
                <Text style={styles.navText}>İstatistikler</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#1e90ff',
        marginTop: 5,
    },
});

export default SchoolBottomNavBar;
