import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginForm({
    onChangeUsername, onChangePassword, onPressLogin,
    errorMessage, onPressCreateAccount
}) {

    function validateForm() {

        onPressLogin();

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

    // console.log(`errorMessage: ${errorMessage}`);

    return (
        <>
            {(errorMessage !== '') && <Text style={styles.errorMessage}>
                    {errorMessage}
                </Text>
            }
            <TextInput
                placeholder="E-mail"
                style={styles.textInput}
                onChangeText={text => onChangeUsername(text)}
                autoCapitalize="none"
            // value={value}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={[styles.textInput, styles.passwordInput]}
                onChangeText={text => onChangePassword(text)}
            />
            <TouchableOpacity
                style={[styles.button, styles.buttonLogin]}
                onPress={validateForm}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={styles.createAccountButton}
                onPress={onPressCreateAccount}
            >
                <Text
                    style={styles.createAccountText}
                >
                    Don't you have an account? SignUp
                </Text>
            </TouchableOpacity> */}
        </>
    );

}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5
    },
    passwordInput: {
        marginTop: 5,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    buttonLogin: {
        marginTop: 15
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