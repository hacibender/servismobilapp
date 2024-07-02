import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Text, Image, TouchableOpacity, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { useLocationService } from '../../api/locationService';
import MapComponent from '../../components/MapView';
import styles from './DriverProfileStyles';
import {DriverRootScreen} from './DriverRootScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const data = [
  { id: 1, plaka: '06 AAA 001', slug: 'DriverRootScreen' },
  { id: 2, plaka: '06 AAA 002' },
  { id: 3, plaka: '06 AAA 003' },
  { id: 4, plaka: '06 AAA 004' },
];

export const DriverProfileScreen = () => {
  const { sendLocationUpdate } = useLocationService();
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Ref for the MapView component

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location', location);
            getLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    let intervalId;

    if (location) {
      sendLocationUpdate(location);
      intervalId = setInterval(getLocation, 5000);
    }

    return () => clearInterval(intervalId);
  }, [location]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(currentLocation);

        // Focus the map on the current location
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            ...currentLocation,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DriverRootScreen')}>
      <View style={styles.itemContainer}>
        <Text style={styles.plakaText}>{item.plaka}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
            <Image source={require('../../images/profilgorsel.png')} style={styles.profileImage} />
            <Text>Ad Soyad</Text>
            <Text>Telefon ve mail bilgileri</Text>
        </View>
        <View style={styles.container}>
      <Text style={styles.baslik}>ARAÇLAR</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
        <View>
            <Text>ROTALAR</Text>
            <Text>Levent College 1A sabah öğrenci servisi - link </Text>
            <Text>Levent College 1A akşam öğrenci servisi - link </Text>
            <Text>Levent College 2A sabah personel servisi - link </Text>
            <Text>Levent College 5BA akşam öğrenci servisi - link </Text>

        </View>
      </View>
      <View style={styles.container}> 
          <MapComponent
            ref={mapRef} // Assign the ref to the MapComponent
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            markersData={location ? [location] : []}
          /> 
      </View>

    </View>
  );
};