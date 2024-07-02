import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Text, Image, TouchableOpacity } from 'react-native';
import styles from './DriverProfileStyles';


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
      </View>
    </View>
  );
};