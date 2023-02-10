import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/WelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

function stackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                        <Stack.Screen name ="WelcomeScreen" component={WelcomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default stackNavigator;