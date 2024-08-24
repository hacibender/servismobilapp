import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image, // Don't forget to import Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/ProfileStyles'; // Assuming you have a style sheet for this
import {
  userAPI,
  schoolAPI,
  schoolbusAPI,
  parentAPI,
  driverAPI,
  routeAPI,
  studentAPI,
  reportAPI,
  tripAPI,
} from '../../api/api';

const dataTypes = [
  { type: 'school', api: schoolAPI, title: 'Schools' },
  { type: 'driver', api: driverAPI, title: 'Drivers' },
  { type: 'schoolbus', api: schoolbusAPI, title: 'School Buses' },
  { type: 'student', api: studentAPI, title: 'Students' },
  { type: 'route', api: routeAPI, title: 'Routes' },
];

export const AdminDashboardScreen = () => {
  const { authState } = useAuth();
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [listData, setListData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const user = await userAPI.getById(authState.user.id); 
        setUserData(user);

        const dataPromises = dataTypes.map(async ({ type, api }) => {
          const data = await api.getAll();
          return { type, data };
        });

        const allData = await Promise.all(dataPromises);
        const newData = {};
        allData.forEach(({ type, data }) => {
          newData[type] = data;
        });
        setListData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data if authenticated 
    if (authState.isAuth) { 
      fetchData();
    }
  }, [authState.isAuth]); // Re-run if authState.isAuth changes

  const renderItem = ({ item, type }) => (
    <TouchableOpacity
      style={styles.itemContainer} 
      onPress={() => navigation.navigate('Details', { itemId: item.id, type })}
    >
      <Text>
        {type === 'school' && item.name}
        {type === 'driver' && `${item.firstName} ${item.lastName}`}
        {type === 'schoolbus' && item.plateNumber}
        {type === 'student' && `${item.firstName} ${item.lastName}`}
        {type === 'route' && item.name}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}> 
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {userData ? (
          <View style={styles.profileInfo}>
            <Image
              source={require('../../images/profilgorsel.png')} 
              style={styles.profileImage}
            />
            <Text style={styles.userName}>
              {userData.firstName} {userData.lastName}
            </Text>
          </View>
        ) : (
          <Text>Loading profile...</Text>
        )}
      </View>

      {/* Data Lists Section */}
      <FlatList
        data={dataTypes}
        keyExtractor={({ type }) => type}
        renderItem={({ item: { type, title } }) => (
          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
              data={listData[type] || []} 
              renderItem={(item) => renderItem({ ...item, type })}
              keyExtractor={(item) => item.id.toString()} 
            />
          </View>
        )}
      />

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {[
          { screen: 'AdminDashboardScreen', label: 'Home' }, 
          { screen: 'AdminTrackingScreen', label: 'Tracking' },
          { screen: 'AdminControlScreen', label: 'Manage' },
          { screen: 'AdminStatsScreen', label: 'Stats' },
          { screen: 'AdminReportsScreen', label: 'Reports' },
        ].map(({ screen, label }) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigation.navigate(screen)} 
            style={styles.navigationButton}
          >
            <Text style={styles.navigationButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};