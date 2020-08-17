import React, { useState, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const logoPath = require("../../assets/images/bizbox.png");

export default function Splash() {

    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={logoPath}
                style={[
                    styles.logo,
                    {
                        transform: [
                            {
                                scaleX: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 15]
                                })
                            },
                            {
                                scaleY: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 12.5]
                                })
                            }
                        ]
                    }
                ]}
            />
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
    logo: {
        width: 40,
        height: 40
    }
});