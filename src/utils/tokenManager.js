import AsyncStorage from '@react-native-community/async-storage';

export async function setToken(token) {
    try {
        await AsyncStorage.setItem('USER_TOKEN', token);
    } catch (e) {
        console.log(e);
    }
    return token;
}

export async function getToken() {
    let token = null;
    try {
        token = await AsyncStorage.getItem('USER_TOKEN');
    } catch (e) {
        console.log(e);
    }
    return token;
}

export async function deleteToken() {
    try {
        token = await AsyncStorage.removeItem('USER_TOKEN');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}