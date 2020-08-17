import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { checkIsUserLoggedIn } from '../store/ducks/auth';
import { Splash, Login, LoginConfirmation, Dashboard } from '../screens';

const Stack = createStackNavigator();

export default function AppNavigation() {

    const isUserLoggedIn = useSelector(state => state.authReducer.isUserLoggedIn);
    const checkedAuth = useSelector(state => state.authReducer.checkedAuth);
    const loginSucced = useSelector(state => state.authReducer.loginSucced);
    const dispatch = useDispatch();

    useEffect(() => {
        init();
    }, []);

    function init() {
        setTimeout(() => {
            dispatch(checkIsUserLoggedIn());
        }, 4000);
    }

    if (!checkedAuth) {
        return <Splash />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {(!isUserLoggedIn) ? (
                    <Stack.Screen name="Login" component={Login} />
                ) : (
                        <>
                            {loginSucced &&
                                <Stack.Screen name="LoginConfirmation" component={LoginConfirmation} />
                            }
                            <Stack.Screen name="Dashboard" component={Dashboard} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}