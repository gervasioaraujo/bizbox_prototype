import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { loginAuth0WithGoogleAccount, loginAuth0, signUpAuth0 } from '../store/ducks/auth';
import { LoginForm, SignUpForm, ModalSpinner } from '../components';

export default function Login() {

    const isLogging = useSelector(state => state.authReducer.isLogging);
    const loginErrorMessage = useSelector(state => state.authReducer.loginErrorMessage);
    const isSigningUp = useSelector(state => state.authReducer.isSigningUp);
    // const signUpErrorMessage = useSelector(state => state.authReducer.signUpErrorMessage);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [viewLoginForm, setViewLoginForm] = useState(true);
    const [isKeyBoardVisible, setIsKeyBoardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        return () => {
            console.log('removing listeners');
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    function keyboardDidShow() {
        setIsKeyBoardVisible(true);
    }

    function keyboardDidHide() {
        setIsKeyBoardVisible(false);
    }

    function closeApp() {
        console.log('close App!');
    }

    function toogleLoginForm() {
        setViewLoginForm(!viewLoginForm);
    }

    function onChangeUsername(username) {
        setUsername(username);
    }

    function onChangePassword(password) {
        setPassword(password);
    }

    function loginWithGoogle() {
        dispatch(loginAuth0WithGoogleAccount());
    }

    function login() {
        dispatch(loginAuth0(username, password));
    }

    // function signup() {
    //     dispatch(signUpAuth0(username, password));
    // }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.inner}>

                    <ModalSpinner modalVisible={isLogging || isSigningUp} />

                    {!isKeyBoardVisible &&
                        <>
                            <View style={styles.closeContainer}>
                                <TouchableOpacity
                                    onPress={closeApp}
                                >
                                    <MaterialCommunityIcons name="close" color={'gray'} size={25} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.wellcomeTextContainer}>
                                <Text style={styles.textPrimary}>Wellcome back</Text>
                                <Text style={styles.textSecondary}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                            </View>
                        </>
                    }

                    <View style={styles.formContainer}>

                        <View style={styles.formHeader}>
                            <TouchableOpacity
                                style={[styles.button, styles.headerButton]}
                                onPress={loginWithGoogle}
                            >
                                <AntDesign name="google" color={'#fff'} />
                                <Text style={styles.buttonText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.headerButton]}
                                onPress={null}>
                                <AntDesign name="apple1" color={'#fff'} />
                                <Text style={styles.buttonText}>Apple</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            viewLoginForm &&
                            <LoginForm
                                onChangeUsername={onChangeUsername}
                                onChangePassword={onChangePassword}
                                onPressLogin={login}
                                onPressCreateAccount={toogleLoginForm}
                                errorMessage={loginErrorMessage}
                            />
                        }

                        {/* {
                            !viewLoginForm &&
                            <SignUpForm
                                onChangeUsername={onChangeUsername}
                                onChangePassword={onChangePassword}
                                onPressSignUp={signup}
                                onPressLogin={toogleLoginForm}
                                errorMessage={signUpErrorMessage}
                            />
                        } */}

                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30, // ###########################################
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    inner: {
        justifyContent: "space-around"
    },
    closeContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 40,
    },
    wellcomeTextContainer: {
        width: '75%',
    },
    textPrimary: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
    },
    textSecondary: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },
    formContainer: {
        marginTop: 20,
        width: '100%',
    },
    formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        marginLeft: 5
    },
    headerButton: {
        width: '49%',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});