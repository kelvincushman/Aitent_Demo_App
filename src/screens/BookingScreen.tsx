import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { SensorEvent } from '../types';

type BookingScreenProps = {
    route: RouteProp<any, "Booking">,
    navigation: FrameNavigationProp<any, "Booking">,
};

export function BookingScreen({ route, navigation }: BookingScreenProps) {
    const sensorEvent = route.params?.sensorEvent as SensorEvent;

    return (
        <scrollView style={styles.container}>
            <label className="text-xl mb-4 font-bold">Book an Electrician</label>
            
            {sensorEvent && (
                <flexboxLayout style={styles.eventCard}>
                    <label style={styles.title}>Sensor Event Details</label>
                    <label style={styles.details}>Type: {sensorEvent.type}</label>
                    <label style={styles.details}>
                        Location: {sensorEvent.location.latitude}, {sensorEvent.location.longitude}
                    </label>
                </flexboxLayout>
            )}

            <flexboxLayout style={styles.formContainer}>
                <label style={styles.label}>Service Details</label>
                <textField 
                    style={styles.input} 
                    hint="Describe your electrical issue"
                    textAlignment="left"
                />
                
                <label style={styles.label}>Contact Information</label>
                <textField 
                    style={styles.input} 
                    hint="Your phone number"
                    keyboardType="phone"
                    textAlignment="left"
                />

                <button 
                    style={styles.submitButton}
                    onTap={() => {
                        // TODO: Implement booking submission
                        navigation.navigate("Home");
                    }}
                >
                    Submit Booking Request
                </button>
            </flexboxLayout>
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
        backgroundColor: "#f5f5f5",
        borderColor: "#e0e0e0",
        borderWidth: 1,
    },
    formContainer: {
        flexDirection: "column",
        marginTop: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    details: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        fontSize: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 4,
        marginBottom: 16,
    },
    submitButton: {
        fontSize: 18,
        color: "#fff",
        backgroundColor: "#2196F3",
        padding: 16,
        borderRadius: 4,
        marginTop: 16,
        textAlignment: "center",
    },
});