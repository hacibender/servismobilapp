import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import AdminBottomNavBar from './AdminBottomNavBar';

const schoolData = [
  {
    id: 1,
    rota: {
      okul: 'Levent College',
      ogrenciSayisi: '320 Öğrenci',
      rotaSayisi: '7 Rota',
      aracSayisi: '5 Araç',
      soforSayisi: '8 Şoför'
    },
    school: 'Levent College'
  },
  {
    id: 2,
    rota: {
      okul: 'Levent College',
      ogrenciSayisi: '280 Öğrenci',
      rotaSayisi: '5 Rota',
      aracSayisi: '3 Araç',
      soforSayisi: '6 Şoför'
    },
    school: 'Levent College'
  },
  {
    id: 3,
    rota: {
      okul: 'Levent College',
      ogrenciSayisi: '540 Öğrenci',
      rotaSayisi: '9 Rota',
      aracSayisi: '7 Araç',
      soforSayisi: '10 Şoför'
    },
    school: 'Levent College'
  },
  {
    id: 4,
    rota: {
      okul: 'Levent College',
      ogrenciSayisi: '370 Öğrenci',
      rotaSayisi: '7 Rota',
      aracSayisi: '5 Araç',
      soforSayisi: '8 Şoför'
    },
    school: 'Levent College'
  },
];

const routeData = [
  {
    id: 1,
    rota: {
      okul: 'Levent College',
      servis: '1A Sabah Servisi',
      plaka: '34 ABC 32',
      zaman: '06:10 - 07:50',
      gunler: 'Haftaiçi Her Gün'
    },
    school: 'Levent College'
  },
  {
    id: 2,
    rota: {
      okul: 'Levent College',
      servis: '1A Sabah Servisi',
      plaka: '34 ABC 32',
      zaman: '06:10 - 07:50',
      gunler: 'Haftaiçi Her Gün'
    },
    school: 'Levent College'
  },
  {
    id: 3,
    rota: {
      okul: 'Levent College',
      servis: '1A Sabah Servisi',
      plaka: '34 ABC 32',
      zaman: '06:10 - 07:50',
      gunler: 'Haftaiçi Her Gün'
    },
    school: 'Levent College'
  },
  {
    id: 4,
    rota: {
      okul: 'Levent College',
      servis: '1A Sabah Servisi',
      plaka: '34 ABC 32',
      zaman: '06:10 - 07:50',
      gunler: 'Haftaiçi Her Gün'
    },
    school: 'Levent College'
  },
];

const parentData = [
  { id: 1, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
  { id: 2, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
  { id: 3, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
  { id: 4, rota: 'Levent College 1A sabah öğrenci servisi', school: 'Levent College' },
];

export const AdminDashboardScreen = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isNavigationReady && auth?.authData && auth?.authData.isAuth) {
      if (auth?.authData.roles.includes("ROOT")) {
        navigation.navigate('AdminDashboardScreen');
      } else if (auth?.authData.roles.includes("SCHOOL")) {
        navigation.navigate('SchoolProfileScreen');
      } else if (auth?.authData.roles.includes("DRIVER")) {
        navigation.navigate('DriverProfileScreen');
      } else if (auth?.authData.roles.includes("PARENT")) {
        navigation.navigate('ParentProfileScreen');
      } else if (auth?.authData.roles.includes("STUDENT")) {
        navigation.navigate('StudentProfileScreen');
      }
    }
  }, [auth, navigation, isNavigationReady]);

  const renderItem = ({ item }) => {
    const { rota } = item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>{rota.okul}</Text>
        <Text style={styles.itemText}>{rota.ogrenciSayisi} {rota.rotaSayisi}</Text>
        <Text style={styles.itemText}>{rota.aracSayisi} {rota.soforSayisi}</Text>
      </TouchableOpacity>
    );
  };

  const renderRouteItem = ({ item }) => {
    const { rota } = item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>{rota.okul}</Text>
        <Text style={styles.itemText}>{rota.servis} {rota.plaka}</Text>
        <Text style={styles.itemText}>{rota.zaman} {rota.gunler}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image source={require('../../images/profilgorsel.png')} style={styles.profileImage} />
          <Text style={styles.profileText}>Ad Soyad</Text>
          <Text style={styles.profileText}>Telefon ve mail bilgileri</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OKULLAR</Text>
          <FlatList
            data={schoolData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ROTALAR</Text>
          <FlatList
            data={routeData}
            renderItem={renderRouteItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VELİLER</Text>
          <FlatList
            data={parentData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
      <AdminBottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '300',
    marginVertical: 3,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 8,
    color: '#444',
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
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});

export default AdminDashboardScreen;
