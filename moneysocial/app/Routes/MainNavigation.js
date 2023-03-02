import * as React from 'react';
import {View, Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/WelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import groupList from '../screens/groupList';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../config/colors';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

// Screen names
const homeName = 'Home';
const detailsName = 'Details';
const groupsName = 'Groups';

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if(rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === detailsName){
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn == groupsName){
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                },
                })}
                tabBarOptions={{
                    activeTintColor: colors.primary,
                    inactiveTintColor: 'black',
                    labelStyle: {fontSize: 12},
                    style: {padding: 10},
                }}
                
                >


                        <Tab.Screen name ={homeName} component={HomeScreen}/>
                        <Tab.Screen name ={detailsName} component={groupList}/>
                        <Tab.Screen name ={groupsName} component={ExpenseListScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}