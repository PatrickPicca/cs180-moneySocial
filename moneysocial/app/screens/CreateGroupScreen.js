import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../config/colors';

export default function CreateGroupScreen() {

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.popToTop();
    }

    return (
        <SafeAreaView style={styles.body}>

            <TextInput 
                style={styles.input}
                placeholder= 'Group Name'
                onChangeText={(value) => setTitle(value)}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>GO BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    input: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'left',
        padding: 10,
        width: '100%',
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    backButton: {
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
      },
      confirmButton: {
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
      },
    buttonText: {
        color: '#fff',
    }
})