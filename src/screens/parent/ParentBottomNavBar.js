import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ParentBottomNavBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ParentProfileScreen')} style={styles.navItem}>
                <Icon name="person" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ParentRootScreen')} style={styles.navItem}>
                <Icon name="directions" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Canlı Takip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ParentStatsScreen')} style={styles.navItem}>
                <Icon name="insert-drive-file" size={24} color="#1e90ff" />
                <Text style={styles.navText}>Raporlar</Text>
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

export default ParentBottomNavBar;
