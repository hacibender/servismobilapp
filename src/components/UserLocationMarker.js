import React from 'react';
import { Marker } from 'react-native-maps';

const UserLocationMarker = ({ markerData }) => {
  return (
    <Marker
      coordinate={{
        latitude: markerData.latitude,
        longitude: markerData.longitude,
      }}
      title="School Bus"
      // Add a custom marker icon if desired
      // icon={require('./path/to/bus_icon.png')}
    />
  );
};

export default UserLocationMarker;