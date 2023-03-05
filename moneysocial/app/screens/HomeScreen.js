import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Pressable, TouchableOpacity} from "react-native";
import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateExpenseScreen from './createExpenseScreen';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
//import stackNavigator from '../Routes/MainNavigation';
//import WelcomeScreen from './WelcomeScreen';
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../src/aws-exports';
import * as queries from '../../src/aws-exports';
import awsconfig from '../../src/aws-exports';
API.configure(awsconfig);

const {width, height} = Dimensions.get('window');

function PersonalExpenseScreen() {
    const {height, width} = Dimensions.get('window');
    const imagePosition = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const myValue = 50;

    const navigation = useNavigation();


    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await API.graphql(graphqlOperation(queries.listUsers));
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          const userData2 = await API.graphql(
            graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
          );
          console.log(authUser.attributes.sub);
          setUser(authUser.attributes.sub);
          //console.log(userData.data.listUsers.items[0]);
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
          amount: 1000, 
          description: "This is a new  test expense",
          userID: user,
          groupID: "Null",
          category: "Test Cateogry"
        },
      };
      const newTodo = await API.graphql({ query: mutations.createExpense, variables});
    }

    const createGroupHandler = async (groupCounting) => {
      const newTodo = await API.graphql({ 
        query: mutations.createGroup, 
        variables: { input: {
          name: "A group",
          groupKey: "A key",
        } }
      });
    }

    const getGroupKeyHandler = async () => {
      const variables = {
        input:{
         groupkey: "A key",
        },
      };
      const newTodo = await API.graphql({ query: queries.getGroup,  variables});
      const theKey = newTodo.data.getGroup.name;
      console.log(theKey);
    }

    
   
    const handleCreateExpense = () => {
      navigation.navigate(CreateExpenseScreen);
    }

    return (

      <View style={styles.container}>

        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <View style={styles.displayBalance}>
            <Text style={styles.displayText}>{'Monthly Expenses: $' + myValue}</Text>
          </View>
          <Pressable style={styles.bottombutton} onPress={createExpenseHandler}>
            <Text style={styles.bottombuttonText}>Create Expense</Text>
          </Pressable>

          <Pressable style={styles.bottombutton} onPress={createGroupHandler}>
            <Text style={styles.bottombuttonText}>Create Group</Text>
          </Pressable>

          <Pressable style={styles.bottombutton} onPress={getGroupKeyHandler}>
            <Text style={styles.bottombuttonText}>Get Group</Text>
          </Pressable>

        </Animated.View>
        <TouchableOpacity style={styles.button} onPress = {handleCreateExpense}>
          <Ionicons name="add" />
        </TouchableOpacity>
      </View>
      
    );
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