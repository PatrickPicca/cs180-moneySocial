import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, TextInput, Pressable, TouchableOpacity, Alert} from "react-native";
//import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
//import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import CreateExpenseScreen from './createExpenseScreen';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
//import UploadImage from './uploadImage';
//import stackNavigator from '../Routes/MainNavigation';
//import WelcomeScreen from './WelcomeScreen';
//import { API, graphqlOperation, Auth } from "aws-amplify";
//import * as mutations from '../../src/graphql/mutations';
//import * as queries from '../../src/graphql/queries';
//import awsconfig from '../../src/aws-exports';
//API.configure(awsconfig);

const {width, height} = Dimensions.get('window');

function PersonalExpenseScreen({ myName, myValue1, myValue2}) {
    //const {height, width} = Dimensions.get('window');
    //const imagePosition = useSharedValue(1);
    //const [isRegistering, setIsRegistering] = useState(false);

    //const myValue1 = 1500;
    //const myValue2 = 50;
    //const myName = 'User';

    //const navigation = useNavigation();

    //user represents the user id used to query and mutate anything related to the currently logged in user.
    //const [user, setUser] = useState(null);
    /*useEffect(() => {
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
*/
    const WelcomeScreenHandler = () => {
      props.navigation.navigate('WelcomeScreen');
    }

    const GroupScreenHandler = () => {
      props.navigation.navigate('groupList');
    }

    const ExpenseListScreenHander = () => {
      props.navigation.navigate('ExpenseListScreen');
    }

    const updateExpenseHandler = async () => {
      //This block of code queries a specified expense object
      console.log("In update expense handler");
        const variables = {
          filter: {
            id : {eq: "4d785079-cbdc-4a6f-9b64-07c59b5d8bef"}
          },
        };
        const newTodo = await API.graphql({ query: queries.listExpenses,  variables});
      console.log(newTodo.data.listExpenses.items[0].description);
      //This block of code updates the desription iwth the specified expense object
      const variables2 = {
          id : '4d785079-cbdc-4a6f-9b64-07c59b5d8bef',
          description : "A basket of eggs"
      };
      const newTodo2 = await API.graphql({ query: mutations.updateExpense,  variables: { input: variables2 }});
      //This line of code uses the previous query to show the now updated description.
      const newTodo3 = await API.graphql({ query: queries.listExpenses,  variables});
      console.log(newTodo3.data.listExpenses.items[0].description);
    }

    const getAllGroupsHandler = async () => {
      console.log("in getAllUsersInGroup handler");
      const variables = {
        filter: {
          userId : {eq: "7914cf82-80b1-4958-b7e3-8498d5833010"}},
      }; 
      const newTodo = await API.graphql({ query: queries.listUserGroups, variables});
      console.log(newTodo);
    };

    const updateUserGroupsHandler = async () => {
      //This block of code queries a specified expense object
      console.log("In UserGroups handler");
      const newTodo = await API.graphql(graphqlOperation(queries.getUser, { id: user }));
      console.log(newTodo.data);
      //This block of code updates the desription iwth the specified expense object
      
      const variables2 = {
          id : user,
          description : "A basket of eggs"
      };
      const newTodo2 = await API.graphql({ query: mutations.updateUser,  variables: { input: variables2 }});
      //This line of code uses the previous query to show the now updated list of Expenses.
      const newTodo3 = await API.graphql(graphqlOperation(queries.getUser, { id: user }));
      console.log(newTodo3.data);
      
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

    const getAllUserExpenses = async () => {
      //This block of code queries a specified expense object
      console.log("In getAllUSerExpenses handler");
      const variables = {
        filter: {
          userID : {eq: user}
        },
      };
      const newTodo = await API.graphql({ query: queries.listExpenses,  variables});
      console.log(newTodo.data.listExpenses);
    
    }

    const getGroupKeyHandler = async () => {
      console.log("In group handler");
      const variables = {
        filter: {
          groupKey : {eq: "A test key"}
        },
      };
      const newTodo = await API.graphql({ query: queries.listGroups,  variables});
      //const theName = newTodo.data.getGroup.name;
      //Returns just the name of the singular object returned
      console.log(newTodo.data.listGroups.items[0].name);
    }

    const deleteExpenseHandler = async () => {
      console.log("In delete expense handler");
      const variables = {
            userID : "56425332-a0ff-4548-8df0-f6b7439a1c78"
      }
      //list all expenses for current user. the userID is hardcoded for now
      const result = await API.graphql({query: queries.expensesByUserID, variables});
      //the expenseIDToDelete is hardcoded for now
      const arr = result.data.expensesByUserID.items;
      const expenseIDToDelete = "73d3c70d-a518-4e20-a798-dba6ce987ea9";
      let found = false;
      //check if the expenseIDToDelete is in the list of expenses for the current user
      if(arr.length > 0){
        for(let i = 0; i < arr.length; i++){
          if(arr[i].id === expenseIDToDelete){
            found = true;
            break;
          }
        }
      }
      if(!found){
        Alert.alert("You do not have the permission to delete this expense");
        return;
      }
            
      const variables1 = {
        input: {
          id: expenseIDToDelete
        }
      }
      //delete the expense
      await API.graphql({query: mutations.deleteExpense, variables: variables1});
      
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
          <Pressable style={styles.button} onPress={getAllGroupsHandler}>
            <Text style={styles.buttonText}>Get All Groups</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={getAllUserExpenses}>
            <Text style={styles.buttonText}>Get All Expenses </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={getGroupKeyHandler}>
            <Text style={styles.buttonText}>Get Group</Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.bottombutton} onPress = {handleCreateExpense}>
          <Text>+</Text>
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