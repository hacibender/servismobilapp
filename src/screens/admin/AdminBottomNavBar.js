import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminBottomNavBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('AdminDashboardScreen')} style={styles.navItem}>
                <Icon name="home" size={24} color="#1e90ff" />
                <Text style={styles.navText}>ANASAYFA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminTrackingScreen')} style={styles.navItem}>
                <Icon name="directions-bus" size={24} color="#1e90ff" />
                <Text style={styles.navText}>ARAÇ TAKİBİ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminControlScreen')} style={styles.navItem}>
                <Icon name="manage-accounts" size={24} color="#1e90ff" />
                <Text style={styles.navText}>YÖNETİM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminStatsScreen')} style={styles.navItem}>
                <Icon name="analytics" size={24} color="#1e90ff" />
                <Text style={styles.navText}>İSTATİSTİKLER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminReportsScreen')} style={styles.navItem}>
                <Icon name="insert-drive-file" size={24} color="#1e90ff" />
                <Text style={styles.navText}>RAPORLAR</Text>
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

export default AdminBottomNavBar;
