import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useAuth } from '../../contexts/AuthContext';

type LoginScreenProps = {
    navigation: FrameNavigationProp<any, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            setError('');
            await login(email, password);
            navigation.navigate('Home');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center">
                Login
            </label>

            {error && (
                <label style={styles.error}>{error}</label>
            )}

            <textField
                style={styles.input}
                hint="Email"
                keyboardType="email"
                text={email}
                onTextChange={(args) => setEmail(args.value)}
            />

            <textField
                style={styles.input}
                hint="Password"
                secure={true}
                text={password}
                onTextChange={(args) => setPassword(args.value)}
            />

            <button
                style={styles.loginButton}
                onTap={handleLogin}
            >
                Login
            </button>

            <button
                style={styles.registerButton}
                onTap={() => navigation.navigate('Register')}
            >
                Create Account
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
    input: {
        fontSize: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 4,
        marginBottom: 16,
    },
    loginButton: {
        fontSize: 18,
        color: "#fff",
        backgroundColor: "#2196F3",
        padding: 16,
        borderRadius: 4,
        marginBottom: 12,
        textAlignment: "center",
    },
    registerButton: {
        fontSize: 16,
        color: "#2196F3",
        padding: 12,
        textAlignment: "center",
    },
    error: {
        color: "#f44336",
        marginBottom: 16,
        textAlignment: "center",
    },
});