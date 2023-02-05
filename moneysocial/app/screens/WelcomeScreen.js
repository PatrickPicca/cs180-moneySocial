import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import colors from '../config/colors'

function WelcomeScreen(props) {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/background.png")}
        >

        <Image style={styles.logo} source={require("../assets/moneysocial-logo.png")}/>

        <TouchableOpacity style={styles.loginButton} onPress={() => console.log("Login Button Pressed")}>
            <Text style={styles.screenText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={() => console.log("Register Button Pressed")}>
            <Text style={styles.screenText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={{fontSize: 12}} onPress={() => console.log("Forgot Password Pressed")}>FORGOT PASSWORD?</Text>
            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 300,
        position: "absolute",
        top: 150,
    },
    loginButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: 60,
        backgroundColor: "#26F224",
        borderRadius: 75,
        marginTop: 300,
        marginBottom: 20,
    },
    registerButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: 60,
        backgroundColor: "#ECF224",
        borderRadius: 75,
        marginBottom: 15,
    },
    screenText: {
        fontSize: 24,
    }
})

export default WelcomeScreen;