import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

export default function ModalSpinner({ modalVisible }) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //     alert("Modal has been closed.");
            // }}
        >
            <View style={styles.modalContent}>
                <ActivityIndicator size="large" color="black" />
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
});