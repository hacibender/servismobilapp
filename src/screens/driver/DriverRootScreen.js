import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Text, Image, TouchableOpacity } from 'react-native';
import styles from './DriverProfileStyles';

import MapComponent from '../../components/MapView';

export const DriverRootScreen = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
            <Image source={require('../../images/profilgorsel.png')} style={styles.profileImage} />
            <Text>Ad Soyad</Text>
            <Text>Telefon ve mail bilgileri</Text>
        </View>
        <View>
            <Text>ROTALAR</Text>
            <Text>Rota bilgileri (Bağlı olduğu araçların kayıtlı olduğu rotalar) ()</Text>
            <View style={styles.imageButtons}>
                <TouchableOpacity style={styles.imageButton}>
                    <Text style={styles.imageButtonTextgreen}>Fotoğrafı Değiştir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton}>
                    <Text style={styles.imageButtonTextred}>Fotoğrafı Sil</Text>
                </TouchableOpacity>
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
    </View>
  );
};