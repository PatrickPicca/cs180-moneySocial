import * as React from 'react';
import {View, Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/WelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import groupList from '../screens/GroupStuff/groupList';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../config/colors';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

// Screen names
const homeName = 'Home';
const detailsName = 'Details';
const groupsName = 'Groups';
const settingsName = 'Settings'
const profileName = 'Profile'

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
            <Tab.Navigator 
            
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarActiveTintColor: "#528265",
                    tabBarInactiveTintColor: "black",
                    tabBarLabelStyle: {
                        fontSize: 12
                    },
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ],
                    tabBarIcon: ({ focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if(rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === profileName){
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (rn === detailsName){
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn == groupsName){
                            iconName = focused ? 'people' : 'people-outline';
                        } else if (rn == settingsName){
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                },

                    headerShown: false
    
                })}

                
                >

                        <Tab.Screen name ={homeName} component={HomeScreen}/>
                        <Tab.Screen name ={profileName} component={ProfileScreen}/>
                        <Tab.Screen name ={detailsName} component={ExpenseListScreen}/>
                        <Tab.Screen name ={groupsName} component={groupList}/>
                        <Tab.Screen name ={settingsName} component={SettingsScreen}/>
            </Tab.Navigator>
    );
}