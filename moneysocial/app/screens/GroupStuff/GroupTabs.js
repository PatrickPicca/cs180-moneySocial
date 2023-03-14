import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import GroupHome from './GroupHome';
import GroupProfile from './GroupProfile';
import GroupExpenseScreen from './GroupExpenseScreen'
// Screen names
const groupHome = 'Home';
const groupExpenses = 'Details';
const groupProfile = 'Profile';

const BottomTab = createBottomTabNavigator();


export default function GroupTabs({route}) {
    const { id } = route.params;
    return (
            <BottomTab.Navigator 
                initialRouteName={groupHome}
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

                        if(rn === groupHome) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === groupProfile){
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (rn === groupExpenses){
                            iconName = focused ? 'list' : 'list-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                },

                    headerShown: false
    
                })}
                >
                        <BottomTab.Screen name={groupHome}>
                            {(props) => <GroupHome {...props} id={id} />}
                        </BottomTab.Screen>
                        <BottomTab.Screen name={groupProfile}>
                            {(props) => <GroupProfile {...props} id={id} />}
                        </BottomTab.Screen>
                        <BottomTab.Screen name={groupExpenses}>
                            {(props) => <GroupExpenseScreen {...props} id={id} />}
                        </BottomTab.Screen>
            </BottomTab.Navigator>
    );
}