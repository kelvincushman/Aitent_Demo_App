import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { BookingScreen } from "../screens/BookingScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SensorEventsScreen } from "../screens/SensorEventsScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { useAuth } from '../contexts/AuthContext';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <flexboxLayout style={{ justifyContent: "center", alignItems: "center" }}>
                <activityIndicator busy={true} />
            </flexboxLayout>
        );
    }

    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName={isAuthenticated ? "Home" : "Login"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#2196F3",
                    },
                    headerTintColor: "#fff",
                    headerShown: true,
                }}
            >
                {!isAuthenticated ? (
                    <>
                        <StackNavigator.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <StackNavigator.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <StackNavigator.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: "Electrician Service" }}
                        />
                        <StackNavigator.Screen
                            name="Booking"
                            component={BookingScreen}
                            options={{ title: "Book Service" }}
                        />
                        <StackNavigator.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ title: "Profile" }}
                        />
                        <StackNavigator.Screen
                            name="SensorEvents"
                            component={SensorEventsScreen}
                            options={{ title: "Sensor Events" }}
                        />
                    </>
                )}
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
};