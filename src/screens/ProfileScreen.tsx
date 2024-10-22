import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { User } from '../types';

type ProfileScreenProps = {
    navigation: FrameNavigationProp<any, "Profile">,
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    // Simulated user data
    const [user] = React.useState<User>({
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'client',
    });

    return (
        <scrollView style={styles.container}>
            <flexboxLayout style={styles.profileHeader}>
                <label style={styles.name}>{user.name}</label>
                <label style={styles.role}>{user.role}</label>
            </flexboxLayout>

            <flexboxLayout style={styles.section}>
                <label style={styles.sectionTitle}>Contact Information</label>
                <label style={styles.detail}>Email: {user.email}</label>
            </flexboxLayout>

            <flexboxLayout style={styles.section}>
                <label style={styles.sectionTitle}>Account Settings</label>
                <button 
                    style={styles.button}
                    onTap={() => {
                        // TODO: Implement edit profile
                    }}
                >
                    Edit Profile
                </button>
                <button 
                    style={[styles.button, styles.dangerButton]}
                    onTap={() => {
                        // TODO: Implement logout
                        navigation.navigate("Home");
                    }}
                >
                    Logout
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
    profileHeader: {
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    role: {
        fontSize: 16,
        color: "#666",
        textTransform: "capitalize",
    },
    section: {
        flexDirection: "column",
        marginBottom: 24,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "#e0e0e0",
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    detail: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    button: {
        fontSize: 16,
        color: "#2196F3",
        marginTop: 8,
        padding: 12,
        borderRadius: 4,
        textAlignment: "center",
    },
    dangerButton: {
        color: "#f44336",
    },
});