import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useLocationService } from '../../api/locationService';
import MapComponent from '../../components/MapView';

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

  return (
    <View>
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
      <View><Text >dgsfgfdgsdfgfdsgsdfgsdfsp: {location}</Text></View>
    </View>
  );
};