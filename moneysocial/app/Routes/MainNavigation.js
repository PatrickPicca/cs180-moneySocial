import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/WelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import groupList from '../screens/groupList';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

function stackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name ="WelcomeScreen" component={WelcomeScreen}/>
                        <Stack.Screen name ="HomeScreen" component={HomeScreen}/>
                        
                        <Stack.Screen name ="groupList" component={groupList}/>
                        <Stack.Screen name ="ExpenseListScreen" component={ExpenseListScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default stackNavigator;