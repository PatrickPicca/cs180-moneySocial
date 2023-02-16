import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Pressable } from "react-native";
import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';

import colors from '../config/colors'

const {width, height} = Dimensions.get('window');

function PersonalExpenseScreen(props) {
    const {height, width} = Dimensions.get('window');
    const imagePosition = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);
    

    //Here we will list all groups you are a part of, alongside any current, total expenses you have made for that group.
      //In the view section you should be able to view / do the following
          //A list of all groups you are in and the current total expenses for them.
            //A button option to enter that group to view expenses for the past option.
            //A button option to expenses by a certain category for the past month.
            //A button option to make an expense.
          //Button option to view total expense for the past month by category.
          //Button option to view the list of all individual expenses of all time.
            //This should take you to some Expense screen where you can fill out a varying list of details for that one expense.
          //Button option to exit the current group.
          //Display somewhere, probably the header, a code unique to that group that others need to join.

    
    //Need a button that exits the groupExpense screen, taking you to you to the PersonalExpense screen.
    //Need some join group prompt with textbox where a user can type in a unique group code.
      //On success that group gets added to the user's list of active groups.
      //On failure, no group is joined.


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
      imagePosition.value = 0;
      if(!isRegistering){
          setIsRegistering(true);
      }
  }

    /*
    return (
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 40,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'white'
      },
      buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
      },
      bottomContainer: {
        justifyContent: 'center',
        height: height / 2,
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

export default PersonalExpenseScreen;