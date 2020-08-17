import * as AuthSession from 'expo-auth-session';
import { setToken, getToken, deleteToken } from '../../utils/tokenManager';

import Auth0 from 'react-native-auth0';
var credentials = require('../../../auth0-credentials');
const auth0 = new Auth0(credentials);

// ######## Action Types:

export const Types = {
    IS_USER_LOGGED_IN: 'IS_USER_LOGGED_IN',
    LOGIN: 'LOGIN',
    LOGIN_SUCCED: 'LOGIN_SUCCED',
    LOGIN_FAILED: 'LOGIN_FAILS',
    LOGOUT: 'LOGOUT',
    SIGNUP: 'SIGNUP',
    SIGNUP_SUCCED: 'SIGNUP_SUCCED',
    SIGNUP_FAILED: 'SIGNUP_FAILED',
    CLEAN_AUTH_STATE: 'CLEAN_AUTH_STATE'
};


// ######## Reducer:

const initialState = {
    isUserLoggedIn: false,
    isLogging: false,
    loginErrorMessage: '',
    checkedAuth: false,
    loginSucced: false,

    // token: null,
    isSigningUp: false,
    signUpErrorMessage: '',
    userInfo: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case Types.IS_USER_LOGGED_IN: {
            return {
                ...state,
                checkedAuth: true,
                isUserLoggedIn: action.payload.isUserLoggedIn,
                userInfo: action.payload.userInfo
            };
        }
        case Types.LOGIN:
            return {
                ...state,
                isLogging: true,
                loginErrorMessage: ''
            };
        case Types.LOGIN_SUCCED:
            return {
                ...state,
                isLogging: false,
                isUserLoggedIn: true,
                loginSucced: true,
                userInfo: action.payload
            };
        case Types.LOGIN_FAILED:
            return {
                ...state,
                isLogging: false,
                loginSucced: false,
                loginErrorMessage: action.payload.errorMessage
            };
        case Types.LOGOUT:
            return {
                ...state,
                isUserLoggedIn: false,
                userInfo: null
            };
        case Types.SIGNUP:
            return {
                ...state,
                isSigningUp: true,
                signUpErrorMessage: ''
            };
        case Types.SIGNUP_SUCCED:
            return {
                ...state,
                isSigningUp: false
            };
        case Types.SIGNUP_FAILED:
            return {
                ...state,
                isSigningUp: false,
                signUpErrorMessage: action.payload.errorMessage
            };
        case Types.CLEAN_AUTH_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}


// ######## Action Creators:

export function checkIsUserLoggedIn() {

    return async (dispatch) => {

        const token = await getToken();
        const isUserLoggedIn = (token !== null) ? true : false;
        const userInfo = await auth0.auth.userInfo({ token });
        dispatch({
            type: Types.IS_USER_LOGGED_IN,
            payload: { isUserLoggedIn, userInfo },
        });

    };

}

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export function loginAuth0WithGoogleAccount() {

    return async (dispatch) => {

        dispatch({ type: Types.LOGIN });

        try {

            const redirectUrl = AuthSession.getRedirectUrl();
            let authUrl = `https://${credentials.domain}/authorize` + toQueryString({
                client_id: credentials.clientId,
                response_type: 'token',
                connection: 'google-oauth2',
                scope: 'openid profile email',
                redirect_uri: redirectUrl,
            });

            // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
            // console.log(`AuthURL is:  ${authUrl}`);

            const result = await AuthSession.startAsync({ authUrl: authUrl });
            console.log(result);

            if (result.type === 'success') {
                await setToken(result.params.access_token);
                const userInfo = await auth0.auth.userInfo({ token: result.params.access_token });
                console.log(userInfo);
                dispatch({ type: Types.LOGIN_SUCCED, payload: userInfo });
            } else {
                let errorMessage = (result.type === 'error') ? result.errorCode : "Error!";
                dispatch({ type: Types.LOGIN_FAILED, payload: { errorMessage } });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: Types.LOGIN_FAILED, payload: { errorMessage: "Error!" } });
        }

    };

}

export function loginAuth0(username, password) {

    return async (dispatch) => {

        dispatch({ type: Types.LOGIN });

        try {
            const response = await auth0.auth.passwordRealm({
                username: username,
                password: password,
                realm: 'Username-Password-Authentication',
                scope: 'openid profile email',
                // audience: 'https://' + credentials.domain + '/userinfo'
            });
            // console.log(response);
            await setToken(response.accessToken);
            const userInfo = await auth0.auth.userInfo({ token: response.accessToken });
            dispatch({ type: Types.LOGIN_SUCCED, payload: userInfo });
        } catch (e) {
            console.log(e.json);
            dispatch({ type: Types.LOGIN_FAILED, payload: { errorMessage: e.json.error_description } });
        }

    };

}

export function logout() {

    return async (dispatch) => {
        await deleteToken();
        dispatch({ type: Types.LOGOUT });
    };

}

export function signUpAuth0(username, password) {

    return async (dispatch) => {

        dispatch({ type: Types.SIGNUP });

        // console.log(`username: ${username}`);
        // console.log(`password: ${password}`);

        try {
            const response = await auth0.auth.createUser({
                email: username,
                password: password,
                connection: 'Username-Password-Authentication',
            });
            console.log(response);
            /*
            Object {
                "Id": "5f36ef3bb230300067049aba",
                "email": "gervasfj@gmail.com",
                "emailVerified": false,
            }
            */
            dispatch({ type: Types.SIGNUP_SUCCED });
        } catch (e) {
            console.log(e.json);
            console.log(e.json.message);
            dispatch({ type: Types.SIGNUP_FAILED, payload: { errorMessage: e.json.message } });
        }

    };

}

export function cleanAuthState() {
    return async (dispatch) => {
        dispatch({ type: Types.CLEAN_AUTH_STATE });
    };
}