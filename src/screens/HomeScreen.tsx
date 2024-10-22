import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MapView } from '../components/MapView';
import { useSensorEvents } from '../hooks/useSensorEvents';
import { SensorEvent, User } from '../types';
import { useAuth } from '../contexts/AuthContext';

type HomeScreenProps = {
    navigation: FrameNavigationProp<any, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const { user } = useAuth();
    const sensorEvents = useSensorEvents();
    const [electricians, setElectricians] = React.useState<User[]>([]);

    // Simulated electricians data
    React.useEffect(() => {
        setElectricians([
            {
                id: 'e1',
                name: 'John Smith',
                email: 'john@example.com',
                role: 'electrician',
                location: {
                    latitude: 51.5074,
                    longitude: -0.1278
                }
            }
        ]);
    }, []);

    const handleMarkerTap = (event: SensorEvent | User) => {
        if ('type' in event) {
            // It's a sensor event
            navigation.navigate('Booking', { sensorEvent: event });
        } else {
            // It's an electrician
            Dialogs.alert({
                title: 'Electrician Details',
                message: `Name: ${event.name}\nEmail: ${event.email}`,
                okButtonText: 'OK'
            });
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <MapView
                sensorEvents={sensorEvents}
                electricians={electricians}
                onMarkerTap={handleMarkerTap}
            />
            
            <flexboxLayout style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    onTap={() => navigation.navigate("Booking")}
                >
                    Book an Electrician
                </button>
                <button
                    style={styles.button}
                    onTap={() => navigation.navigate("SensorEvents")}
                >
                    View Sensor Events
                </button>
            </flexboxLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        backgroundColor: "white",
    },
    button: {
        fontSize: 16,
        color: "#2196F3",
        padding: 12,
        textAlignment: "center",
        flex: 1,
        margin: 4,
    },
});