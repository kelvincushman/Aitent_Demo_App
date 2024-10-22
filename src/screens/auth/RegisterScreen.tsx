import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useAuth } from '../../contexts/AuthContext';

type RegisterScreenProps = {
    navigation: FrameNavigationProp<any, "Register">,
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const { login } = useAuth();

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // TODO: Implement actual registration
            await login(email, password);
            navigation.navigate('Home');
        } catch (err) {
            setError('Failed to create account.');
        }
    };

    return (
        <scrollView style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center">
                Create Account
            </label>

            {error && (
                <label style={styles.error}>{error}</label>
            )}

            <textField
                style={styles.input}
                hint="Full Name"
                text={name}
                onTextChange={(args) => setName(args.value)}
            />

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

            <textField
                style={styles.input}
                hint="Confirm Password"
                secure={true}
                text={confirmPassword}
                onTextChange={(args) => setConfirmPassword(args.value)}
            />

            <button
                style={styles.registerButton}
                onTap={handleRegister}
            >
                Create Account
            </button>

            <button
                style={styles.loginButton}
                onTap={() => navigation.navigate('Login')}
            >
                Already have an account? Login
            </button>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
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
    registerButton: {
        fontSize: 18,
        color: "#fff",
        backgroundColor: "#2196F3",
        padding: 16,
        borderRadius: 4,
        marginBottom: 12,
        textAlignment: "center",
    },
    loginButton: {
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