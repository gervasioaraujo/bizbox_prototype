import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function LoginConfirmation({ navigation }) {

    const userInfo = useSelector(state => state.authReducer.userInfo);

    setTimeout(() => {
        navigation.dispatch(
            StackActions.replace('Dashboard')
        );
    }, 2000);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Hi, <Text style={styles.userName}>{userInfo.name}</Text>, welcome to BizBox Prototype App
            </Text>
            <MaterialCommunityIcons name="check-bold" color={"#27ae60"} size={30} />
            <Text style={styles.loginSuccedText}>Loggin Succed!</Text>
            <Text style={styles.redirectingText}>Redirecting to Dashboard...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    loginSuccedText: {
        color: '#27ae60',
        fontSize: 14,
        fontWeight: 'bold'
    },
    userName: {
        fontWeight: 'bold'
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    redirectingText: {
        marginTop: 10,
        color: "#95a5a6",
        fontSize: 12,
    }
});