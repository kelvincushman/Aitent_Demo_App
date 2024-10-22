import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useSensorEvents } from '../hooks/useSensorEvents';

type SensorEventsScreenProps = {
    navigation: FrameNavigationProp<any, "SensorEvents">,
};

export function SensorEventsScreen({ navigation }: SensorEventsScreenProps) {
    const events = useSensorEvents();

    return (
        <scrollView style={styles.container}>
            <label className="text-xl mb-4 font-bold">Recent Sensor Events</label>
            {events.map((event) => (
                <flexboxLayout key={event.id} style={styles.eventCard}>
                    <label style={styles.eventType}>{event.type}</label>
                    <label style={styles.eventDetails}>
                        Battery: {event.batteryLevel}%
                    </label>
                    <label style={styles.eventDetails}>
                        Location: {event.location.latitude}, {event.location.longitude}
                    </label>
                    <label style={styles.eventDetails}>
                        Time: {new Date(event.timestamp).toLocaleString()}
                    </label>
                    <button
                        style={styles.button}
                        onTap={() => navigation.navigate("Booking", { sensorEvent: event })}
                    >
                        Request Service
                    </button>
                </flexboxLayout>
            ))}
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 20,
    },
    eventCard: {
        flexDirection: "column",
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderColor: "#e0e0e0",
        borderWidth: 1,
    },
    eventType: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2196F3",
        marginBottom: 8,
    },
    eventDetails: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    button: {
        fontSize: 16,
        color: "#2196F3",
        marginTop: 8,
    },
});