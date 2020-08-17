import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpForm({
    onChangeUsername, onChangePassword, onPressSignUp,
    errorMessage, onPressLogin
}) {

    function validateForm() {

        onPressSignUp();

        // usernameError = false
        // passwordError = false

        // if (!this.state.username.length) {
        //     usernameError = true
        // }
        // if (!this.state.password.length) {
        //     passwordError = true
        // }
        // this.setState({ usernameError: usernameError, passwordError: passwordError })
        // if (usernameError === false && passwordError === false) {
        //     this.props.realmLogin(this.state.username, this.state.password)
        // }

    }

    return (
        <View style={styles.formInputs}>
            <Text style={styles.errorMessage}>
                {errorMessage}
            </Text>
            <TextInput
                placeholder="E-mail"
                style={styles.textInput}
                onChangeText={text => onChangeUsername(text)}
            // value={value}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.textInput}
                onChangeText={text => onChangePassword(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={validateForm}
            >
                <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={onPressLogin}
            >
                <Text
                    style={styles.createAccountText}
                >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    formInputs: {
        paddingVertical: 20,
        // borderT
    },
    textInput: {
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 5
    },
    button: {
        // marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        marginLeft: 5,
        // backgroundColor: 'blue',
    },
    createAccountButton: {
        // backgroundColor: 'yellow',
        padding: 10,
        alignItems: 'center'
    },
    createAccountText: {
        color: 'blue'
    },
    errorMessage: {
        marginBottom: 5,
        // backgroundColor: 'yellow',
        textAlign: 'center',
        color: 'red'
    }
});