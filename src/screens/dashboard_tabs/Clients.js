import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Clients() {
    return (
        <View style={styles.container}>
            <Text>This is Clients tab</Text>
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
});