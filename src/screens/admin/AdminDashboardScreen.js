import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Text, Image, TouchableOpacity, Button, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/ProfileStyles';

const data = [
  { id: 1, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
  { id: 2, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
  { id: 3, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
  { id: 4, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
];

export const AdminDashboardScreen = () => {
  const auth = useAuth(); 
  const navigation = useNavigation();
  const [isNavigationReady, setIsNavigationReady] = useState(false); // Add this

  useEffect(() => {
    const timer = setTimeout(() => { // Small delay to ensure navigation is ready
      setIsNavigationReady(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isNavigationReady && auth?.authData && auth?.authData.isAuth) { // Check navigation readiness
        if (auth?.authData.roles.includes("ROOT")) {
          navigation.navigate('AdminDashboardScreen'); 
        } else if (auth?.authData.roles.includes("SCHOOL")) { // Assuming "DRIVER" role
          navigation.navigate('SchoolProfileScreen'); 
        } else if (auth?.authData.roles.includes("DRIVER")) { // Assuming "DRIVER" role
          navigation.navigate('DriverProfileScreen'); 
        } else if (auth?.authData.roles.includes("PARENT")) { // Assuming "DRIVER" role
          navigation.navigate('ParentProfileScreen'); 
        } else if (auth?.authData.roles.includes("STUDENT")) { // Assuming "DRIVER" role
          navigation.navigate('StudentProfileScreen'); 
        } else {
          // Handle other roles or default navigation if needed
        }
      }
  }, [auth, navigation, isNavigationReady]); 

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={styles.plakaText}>{item.plaka} , {item.school}, detay</Text>
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
          <Text style={styles.baslik}>OKULLAR</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.baslik}>ROTALAR</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.baslik}>VELİLER</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AdminDashboardScreen')} >
          <View>
            <Text>ANASAYFA / DASHBOARD</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminTrackingScreen')}>
          <View>
            <Text>ARAÇ TAKİBİ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminControlScreen')}>
          <View>
            <Text>YÖNETİM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminStatsScreen')}>
          <View>
            <Text>İSTATİSTİKLER</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminReportsScreen')}>
          <View>
            <Text>RAPORLAR</Text>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
};


