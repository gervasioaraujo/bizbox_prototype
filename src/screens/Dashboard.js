import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Home, Jobs, Clients, Wallet, Profile } from './dashboard_tabs';

const Tab = createBottomTabNavigator();

export default function Dashboard() {

    return (
        <Tab.Navigator
            initialRouteName="Jobs"
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Jobs"
                component={Jobs}
                options={{
                    tabBarLabel: 'Jobs',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="work" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Clients"
                component={Clients}
                options={{
                    tabBarLabel: 'Clients',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="people" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={Wallet}
                options={{
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="wallet" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="face-profile" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );

}