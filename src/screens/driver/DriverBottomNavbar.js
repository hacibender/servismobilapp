import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DriverBottomNavBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('DriverBusScreen')} style={styles.navItem}>
                <Icon name="directions-bus" size={24} color="#1e90ff" />
                <Text style={styles.navText}>ARAÇLARIM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DriverRootScreen')} style={styles.navItem}>
                <Icon name="directions" size={24} color="#1e90ff" />
                <Text style={styles.navText}>ROTALAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DriverStatsScreen')} style={styles.navItem}>
                <Icon name="analytics" size={24} color="#1e90ff" />
                <Text style={styles.navText}>SÜRÜŞLERİM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DriverProfileScreen')} style={styles.navItem}>
                <Icon name="person" size={24} color="#1e90ff" />
                <Text style={styles.navText}>PROFİL</Text>
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

export default DriverBottomNavBar;
