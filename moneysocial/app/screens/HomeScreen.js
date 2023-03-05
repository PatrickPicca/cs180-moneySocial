import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, TextInput, Pressable, TouchableOpacity} from "react-native";
import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateExpenseScreen from './createExpenseScreen';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
//import stackNavigator from '../Routes/MainNavigation';
//import WelcomeScreen from './WelcomeScreen';
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../src/mutations';
import * as queries from '../../src/queries';
import awsconfig from '../../src/aws-exports';
API.configure(awsconfig);

const {width, height} = Dimensions.get('window');

function PersonalExpenseScreen() {
    const {height, width} = Dimensions.get('window');
    const imagePosition = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const myValue1 = 1500;
    const myValue2 = 50;
    const myName = 'User';

    const navigation = useNavigation();

    //user represents the user id used to query and mutate anything related to the currently logged in user.
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          const userData2 = await API.graphql(
            graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
          );
          console.log(authUser.attributes.sub);
          setUser(authUser.attributes.sub);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }; 
      fetchUser();
    }, []);
    //user.id
    //user.expenses

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

    const ExpenseListScreenHander = () => {
      props.navigation.navigate('ExpenseListScreen');
    }

    const createExpenseHandler = async () => {
      const variables = {
        input: {
          amount: 5000, 
          description: "Test dummy expense",
          userID: user,
          groupID: "Null",
          category: "Food"
        },
      };
      const newTodo = await API.graphql({ query: mutations.createExpense, variables});
    }

    const createGroupHandler = async (groupCounting) => {

      //Have query to attempt to locate any group with the passed in groupKey from user. If not in use, create group.
      //If valid, fails to create to group.
      const newTodo = await API.graphql({ 
        query: mutations.createGroup, 
        variables: { input: {
          name: "Another group",
          groupKey: "Another key",
          //Add the current user to that group
        } }
      });
    }

    const getGroupKeyHandler = async () => {
      console.log("In group handler");
      const variables = {
        filter: {
          groupKey : {contains: "A test key"}
        },
      };
      const newTodo = await API.graphql({ query: queries.listGroups,  variables});
      //const theName = newTodo.data.getGroup.name;
      //Returns just the name of the singular object returned
      console.log(newTodo.data.listGroups.items[0].name);
    }

     
   
    const handleCreateExpense = () => {
      navigation.navigate(CreateExpenseScreen);
    }

    return (

      <SafeAreaView style={styles.container}>

        <Text style={styles.welcomeText}>{'Welcome ' + myName + '!'}</Text>
        <Text style={styles.displayText}>{'Monthly Budget: $' + myValue1}</Text>
        <Text style={styles.displayText}>{'Monthly Expenses: $' + myValue2}</Text>

        <View style={styles.bottomContainer}>
          <Pressable style={styles.button} onPress={createExpenseHandler}>
            <Text style={styles.buttonText}>Create Expense</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={createGroupHandler}>
            <Text style={styles.buttonText}>Create Group</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={getGroupKeyHandler}>
            <Text style={styles.buttonText}>Get Group</Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.bottombutton} onPress = {handleCreateExpense}>
          <Ionicons name="add" />
        </TouchableOpacity>
        </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.background,
      },
      button: {
        backgroundColor: colors.accent,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
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
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
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
        paddingTop: 20,
        paddingLeft: 15
      },
      welcomeText: {
        fontSize: 30,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5,
        paddingTop: 20,
        paddingLeft: 15,
        paddingBottom: 20
      },
      bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
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
        borderRadius: 10, //Affects the radius of the corners
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        top: +10,
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