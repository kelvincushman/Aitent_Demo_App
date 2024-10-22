import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { Mapbox } from '@nativescript/mapbox';
import { SensorEvent, User } from '../types';

interface MapViewProps {
  sensorEvents: SensorEvent[];
  electricians: User[];
  onMarkerTap?: (event: SensorEvent | User) => void;
}

export function MapView({ sensorEvents, electricians, onMarkerTap }: MapViewProps) {
  const mapRef = React.useRef<Mapbox>();

  React.useEffect(() => {
    // Initialize map
    const map = new Mapbox();
    map.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    map.show({
      style: Mapbox.MapStyle.LIGHT,
      center: {
        lat: 51.5074,
        lng: -0.1278
      },
      zoomLevel: 12,
      showUserLocation: true,
      hideCompass: true
    });

    // Add markers for sensor events
    sensorEvents.forEach(event => {
      map.addMarkers([
        {
          lat: event.location.latitude,
          lng: event.location.longitude,
          title: event.type,
          subtitle: `Battery: ${event.batteryLevel}%`,
          onTap: () => onMarkerTap?.(event)
        }
      ]);
    });

    // Add markers for electricians
    electricians.forEach(electrician => {
      if (electrician.location) {
        map.addMarkers([
          {
            lat: electrician.location.latitude,
            lng: electrician.location.longitude,
            title: electrician.name,
            subtitle: 'Electrician',
            onTap: () => onMarkerTap?.(electrician)
          }
        ]);
      }
    });

    mapRef.current = map;

    return () => {
      map.destroy();
    };
  }, [sensorEvents, electricians]);

  return (
    <contentView style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});