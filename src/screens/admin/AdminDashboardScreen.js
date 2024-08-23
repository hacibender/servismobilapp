import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/ProfileStyles';
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
  const auth = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [listData, setListData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userAPI.getById(auth.authData.user.id);
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

    fetchData();
  }, []);

  const renderItem = ({ item, type }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', { itemId: item.id, type });
      }}
    >
      <View style={styles.itemContainer}>
        <Text>
          {type === 'school' && item.name}
          {type === 'driver' && `${item.firstName} ${item.lastName}`}
          {type === 'schoolbus' && item.plateNumber}
          {type === 'student' && `${item.firstName} ${item.lastName}`}
          {type === 'route' && item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {userData ? (
          <View style={styles.profileInfo}>
            {/* Assuming you have a profile image component */}
            <Image
              source={require('../../images/profilgorsel.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userName}>
                {userData.firstName} {userData.lastName}
              </Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>

      {/* Data Lists Section */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {/* Use a mapping approach for navigation buttons */}
        {[
          { screen: 'AdminDashboard', label: 'Home' },
          { screen: 'AdminTracking', label: 'Tracking' },
          { screen: 'AdminControl', label: 'Manage' },
          { screen: 'AdminStats', label: 'Stats' },
          { screen: 'AdminReports', label: 'Reports' },
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