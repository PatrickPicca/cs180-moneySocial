import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import  BottomTabs from './MainNavigation'
import CreateExpenseScreen from '../screens/createExpenseScreen';


const Stack = createStackNavigator();

function stackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
              }}
            >
                        <Stack.Screen name ="BottomTabs" component={BottomTabs}/>
                        <Stack.Screen name ="CreateExpenseScreen" component={CreateExpenseScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default stackNavigator;