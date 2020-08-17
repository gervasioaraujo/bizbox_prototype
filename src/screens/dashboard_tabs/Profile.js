import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/ducks/auth';

export default function Profile({ navigation }) {

    const userInfo = useSelector(state => state.authReducer.userInfo);
    const dispatch = useDispatch();

    function _logout() {
        dispatch(logout());
    }

    return (
        <View style={styles.container}>
            {userInfo &&
                <>
                    <Image source={{ uri: userInfo.picture }} style={styles.picture} />
                    <Text style={styles.userName}>{userInfo.name}</Text>
                    <Text style={styles.email}>{userInfo.email}</Text>
                </>
            }
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={_logout}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    logoutButton: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    logoutButtonText: {
        color: '#fff',
    }
});