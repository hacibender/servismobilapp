import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import ParentBottomNavBar from './ParentBottomNavBar';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = '<API_KEY>';

const ParentRootScreen = ({ navigation }) => {
    const [startingPoint] = useState({
        latitude: 41.0315,
        longitude: 28.9761,
    });

    const destinationPoint = {
        latitude: 41.0255,
        longitude: 28.9744,
    };

    const studentsLocations = [
        { latitude: 41.0328, longitude: 28.9783 },
        { latitude: 41.0389, longitude: 28.9648 },
    ];

    const schoolData = [
        {
            id: 1,
            rota: {
                okul: 'Gülbahar Mahallesi Rotası',
                ogrenciSayisi: '14 Öğrenci',
                sofor: 'Ali Şimşek',
                plaka: '34 ABC 34',
                gunler: 'Haftaiçi Her Gün',
                saatler: '07:00 - 08:00 ve 15:00 - 16:00'
            },
        },
    ];

    const studentData = [
        { id: 1, name: 'Ahmet Yılmaz', class: '5A', parentName: 'Mehmet Yılmaz' },
        { id: 2, name: 'Ayşe Demir', class: '4B', parentName: 'Fatma Demir' },
        { id: 3, name: 'Mehmet Can', class: '3C', parentName: 'Ali Can' },
        { id: 4, name: 'Fatma Nur', class: '2A', parentName: 'Ayşe Nur' },
        // Diğer öğrenciler...
    ];

    const renderRotaItem = ({ item }) => {
        const { rota } = item;
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{rota.okul}</Text>
                <Text style={styles.itemText}>Öğrenci Sayısı: {rota.ogrenciSayisi}</Text>
                <Text style={styles.itemText}>Şoför: {rota.sofor}</Text>
                <Text style={styles.itemText}>Plaka: {rota.plaka}</Text>
                <Text style={styles.itemText}>Günler: {rota.gunler}</Text>
                <Text style={styles.itemText}>Saatler: {rota.saatler}</Text>
            </View>
        );
    };

    const renderStudentItem = ({ item }) => {
        return (
            <View style={styles.studentItemContainer}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.studentClass}>Sınıf: {item.class}</Text>
                <Text style={styles.studentParent}>Veli: {item.parentName}</Text>
            </View>
        );
    };

    return (
        <View style={styles.screenContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rota Detayları</Text>
                    <FlatList
                        data={schoolData}
                        renderItem={renderRotaItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <TouchableOpacity style={styles.liveTrackingButton} onPress={() => alert('Canlı Takip Başlatıldı!')}>
                        <Text style={styles.liveTrackingButtonText}>Canlı Takip</Text>
                    </TouchableOpacity>
                    <Text style={styles.sectionSubtitle}>Öğrencim Nerede</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 41.0315,
                            longitude: 28.9761,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
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
            </ScrollView>
            <View style={styles.bottomMenu}>
                <ParentBottomNavBar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bottomMenu: {
        justifyContent: 'space-between',
        borderTopColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        gap: 8,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 8,
        color: '#444',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    liveTrackingButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    liveTrackingButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    studentItemContainer: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    studentName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    studentClass: {
        fontSize: 14,
        color: '#666',
    },
    studentParent: {
        fontSize: 14,
        color: '#666',
    },
    map: {
        height: 300,
        marginTop: 20,
    },
});

export default ParentRootScreen;
