import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Pressable } from "react-native";
import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';

import colors from '../config/colors'
import { useNavigation, useNavigationState } from '@react-navigation/native';
//import stackNavigator from '../Routes/MainNavigation';
//import WelcomeScreen from './WelcomeScreen';

const {width, height} = Dimensions.get('window');

function ExpenseListScreen(props) {
    const {height, width} = Dimensions.get('window');
    const imagePosition = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const myValue = 50;

    //This screen should have a filter bar at the top to allow the user to filter all epxenses they are seeing.
    //Should display a list of all expenses for the user, starting with the most previous.
      //Display Expense amount, category name, and date for now.
    //Should be able to scroll????? through the list of expenses.

    //Bottom of the screen should have a bar for screen navigation of a few buttons.


    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
        };
    });

    const buttonsAnimatedStyle = useAnimatedStyle (() =>{
        const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
        return {
            opacity: withTiming(imagePosition.value, 500),
            transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
        }
    })

    const closeButtonContainerStyle = useAnimatedStyle (() =>{
        const interpolation = interpolate(imagePosition.value, [0,1], [180,360])
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
            transform: [{rotate: withTiming(interpolation + "deg", {duration: 1000})}]
        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height/2 + 35,0])
        return {
            opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1,{duration: 1000})) : withTiming(0, {duration: 300}),
            transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
        }
    })

    const loginHandler = () => {
        imagePosition.value = 0;
        if(isRegistering){
            setIsRegistering(false);
        }
    }
    const registerHandler = () => {
        imagePosition.value = 0;
        if(!isRegistering){
            setIsRegistering(true);
        }
    }

    const WelcomeScreenHandler = () => {
      props.navigation.navigate('WelcomeScreen');
    }

    const GroupScreenHandler = () => {
      props.navigation.navigate('groupList');
    }
    const HomeScreenHandler = () => {
      props.navigation.navigate('HomeScreen');
    }

    return (

      <View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <View style={styles.displayBalance}>
            <Text style={styles.displayText}>{'Expense 1: $' + myValue}</Text>
          </View>
          <View style={styles.displayBalance}>
            <Text style={styles.displayText}>{'Expense 2: $' + myValue}</Text>
          </View>
        </Animated.View> 
        <Animated.View style={buttonsAnimatedStyle}>
          <View style={styles.bottomScreenHeader}>
            <Pressable style={styles.bottombutton} onPress={WelcomeScreenHandler}>
              <Text style={styles.bottombuttonText}>Logout</Text>
            </Pressable>

            <Pressable style={styles.bottombutton} onPress={HomeScreenHandler}>
              <Text style={styles.bottombuttonText}>Home</Text>
            </Pressable>

            <Pressable style={styles.bottombutton} onPress={GroupScreenHandler}>
              <Text style={styles.bottombuttonText}>Groups</Text>
            </Pressable>

            
            
          </View>  
        </Animated.View>
      </View>
      
    );

    /*
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
            <ClipPath id = "clipPathId">
                <Ellipse cx={width/2} rx={height} ry={height}/>
            </ClipPath>
          <Image
            href={require("../assets/moneysocial-logo.png")}
            width={width}
            height = {height-250}
            clipPath = "url(#clipPathId)"
          />
        </Svg>
        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
        <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
       <Animated.View style={buttonsAnimatedStyle}>
        <Pressable style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
       </Animated.View>
       <Animated.View style={buttonsAnimatedStyle}>
        <Pressable style={styles.button} onPress={registerHandler}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
       </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          {isRegistering && (
            <TextInput
            placeholder="Full Name"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            /> 
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>{isRegistering ? 'REGISTER' : 'LOG IN'}</Text>
          </View>
        </Animated.View>
      </View>
    </View>

    );
    */
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.background,
      },
      button: {
        
        backgroundColor: colors.primary,
        height: 55,
        width: 60,
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
        color: 'white',
        letterSpacing: 0.5
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

export default ExpenseListScreen;