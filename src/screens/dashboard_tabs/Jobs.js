import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Jobs() {

    function createJob() {
        alert("Ok, let's create a new job!");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textPrimary}>Create your first job</Text>
            <Text style={styles.textSecondary}>You don't have any posted jobs or job offers yet, try creating your first now.</Text>
            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={createJob}
            >
                <Text style={styles.textButtonCreate}>Create first job</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPrimary: {
        fontSize: 35,
        fontWeight: 'bold',
        // backgroundColor: 'gray',
        // color: PRIMARY_COLOR
        color: 'black',
        textAlign: 'center'
    },
    textSecondary: {
        // backgroundColor: 'red',
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        // color: SECONDARY_COLOR
        color: 'black',
        textAlign: 'center'
    },
    buttonCreate: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    textButtonCreate: {
        color: '#fff',
        // fontWeight: 'bold'
    }
});