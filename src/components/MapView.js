import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const UserLocationMarker = ({ markerData }) => (
  <Marker
    coordinate={{
      latitude: markerData.latitude,
      longitude: markerData.longitude,
    }}
    title="Your Location"
  />
);

const MapComponent = React.forwardRef(({ initialRegion, markersData }, ref) => {
  return (
    <View style={styles.container}>
      <MapView
        ref={ref} 
        style={styles.map}
        initialRegion={initialRegion}
      >
        {markersData.map((marker, index) => (
          <UserLocationMarker key={index} markerData={marker} />
        ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400, // Adjust as needed
    width: 400, // Adjust as needed
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;