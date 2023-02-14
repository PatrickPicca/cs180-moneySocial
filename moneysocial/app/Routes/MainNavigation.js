import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/WelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PersonalExpense from '../screens/PersonalExpense';
import groupExpense from '../screens/groupExpense';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

function stackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                        <Stack.Screen name ="WelcomeScreen" component={WelcomeScreen}/>
                        <Stack.Screen name ="PersonalExpense" component={PersonalExpense}/>
                        <Stack.Screen name ="groupExpense" component={groupExpense}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default stackNavigator;