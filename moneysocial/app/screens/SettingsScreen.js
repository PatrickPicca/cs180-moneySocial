import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TextInput, Pressable, TouchableOpacity } from "react-native";
import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';

import colors from '../config/colors'
import { useNavigation, useNavigationState } from '@react-navigation/native';


const {width, height} = Dimensions.get('window');

function SettingsScreen(props) {
    const {height, width} = Dimensions.get('window');
    const imagePosition = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);
    

    return (

      <>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'Account Info'}</Text>
            <View style={styles.container}>
                <Text style={styles.displayText}>{'Username: '}</Text>
                <Text style={styles.displayText}>{'Email: '}</Text>
                <Text style={styles.displayText}>{'Password: '}</Text>
            </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>

        </View>
        </SafeAreaView>
    </>
      
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 40,
        paddingRight: 300,
        backgroundColor: colors.background,
      }, 
      titleContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: colors.background,
      },
      titleText:{
        fontSize: 30,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5
      },
      button: {
        backgroundColor: colors.primary,
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 5,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'white'
      },
      bottombutton: {
        
        backgroundColor: colors.primary,
        height: 55,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 5,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'pink'
      },
      buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
      },
      bottombuttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
      },
      displayText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5,
        paddingBottom: 20,
        paddingLeft: 20
      },
      bottomContainer: {
        justifyContent: 'center',
        height: height / 8,
      },
      bottomScreenHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: height / 8,
      },
      textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: colors.primary,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10
      },
      formButton: {
        backgroundColor: colors.primary,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      displayBalance: {
        backgroundColor: colors.accent,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25, //Affects the radius of the corners
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        top: +50,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      formInputContainer: {
        marginBottom: 70,
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: 'center'
      },
      closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        top: -25
    }
})

export default SettingsScreen;