import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/tr';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import DriverBottomNavBar from './DriverBottomNavbar';

const GOOGLE_MAPS_APIKEY = '<AIzaSyBHQRCFiRddxgqe52RO0ua3E21RwyAwwvU>';

const DriverRootScreen = ({ navigation }) => {
  const currentDateTime = moment().locale('tr').format('DD MMMM dddd HH:mm');
  const [modalVisible, setModalVisible] = useState(false);

  const [startingPoint, setStartingPoint] = useState({
    latitude: 41.0315,
    longitude: 28.9761,
  });

  const studentsLocations = [
    { latitude: 41.0328, longitude: 28.9783 },
    { latitude: 41.0389, longitude: 28.9648 },
  ];

  const destinationPoint = { latitude: 41.0595, longitude: 28.9216 };

  const routeData = [
    {
      id: 1,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        zaman: '06:10 - 07:50',
        tarih: '12.07.2024',
        rota: 'Gülbahar Mahallesi Rotası',
      },
      school: 'Levent College'
    },
  ];

  const renderRouteItem = ({ item }) => {
    const { rota } = item;
    let textColor;

    switch (rota.durum) {
      case 'Başarılı':
        textColor = '#2E7D32';
        break;
      case 'Başarısız':
        textColor = '#D32F2F';
        break;
      case 'Gecikmeli':
        textColor = '#FFC107';
        break;
      default:
        textColor = '#555';
        break;
    }

    return (
      <TouchableOpacity onPress={() => navigation.navigate('DriverRootScreen')} style={styles.itemContainer}>
        <Text style={[styles.itemSchoolText, { color: '#555' }]}>{rota.okul}</Text>
        <Text style={[styles.itemFirstText, { color: '#555' }]}>{rota.servis} {rota.plaka}</Text>
        <Text style={[styles.itemText, { color: '#555' }]}>{rota.zaman} {rota.tarih}</Text>
        <Text>{rota.rota}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.title}>Servis Home</Text>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={{
            latitude: 41.0315,
            longitude: 28.9761,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
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
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeText}>{currentDateTime}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.gelmiyorum}>
            <TouchableOpacity style={styles.buttonred}>
              <Text style={styles.buttonTextred}>Sefere Başla</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.routeListContainer}>
          <FlatList
            data={routeData}
            renderItem={renderRouteItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.routeList}
          />
        </View>
      </ScrollView>
      <DriverBottomNavBar style={styles.bottomNavBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    padding: 20,
    paddingBottom: 80, // BottomNavBar için yer açıyoruz
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  mapContainer: {
    height: 300,
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
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonred: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    borderColor: '#2E7D32',
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gelmiyorum: {
    width: '100%',
  },
  buttonTextred: {
    color: '#2E7D32',
    fontSize: 14,
    textAlign: 'center',
  },
  routeListContainer: {
    flex: 1,
  },
  routeList: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  itemSchoolText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginBottom: 4,
  },
  itemFirstText: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 4,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default DriverRootScreen;
