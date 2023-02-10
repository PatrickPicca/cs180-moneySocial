import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, Component } from 'react';
import { Button, Alert, SafeAreaView, TouchableOpacity } from 'react-native';

export default function App() {

  //The below vars will need to be converted to use 'useState's if you want to implement them within the switch
  var userPassword;   //Represents the users login password.
  var userName;       //Represents the users login name
  var groupList = []; //Represents the IDs of all groups the user is a part of.
  var expenseCategories = []; //Represents the list of Categories the user has specified for themself. 
  var expenses;

  const widthAndHeight = 250
  const series = [123, 321, 123, 789, 537]
  const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']


  //count represents the varying screens the user will see, depending on the buttons they press
  var [count, setCount] = useState();  
  //Counter represents a second count that alternates in sending the user to either the default screen or the Test screen
  var [counter, setCounter] = useState(1);


  switch (count)
  {
    case 0:     //Test screen. Use as basis.
      return (
        <View style={styles.container2}>
          <Text>This is a test menu</Text>
          <Text>Press any button</Text>   
          <StatusBar style="auto" />
          <View style={styles.buttonContainer}>
            <Button
                // Some properties given to Button
                title="Login"
                //onPress={() => Alert.alert('Its GeeksforGeeks !')}
                onPress={() => setCount(count = 1)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
                // Some properties given to Button
                title="Register   (State not made, do not press)"
                //onPress={() => Alert.alert('Its GeeksforGeeks !')}
                onPress={() => setCount(count = 2)}
            />
          </View>
        </View>
        
        
      );
    break;
    case 1:     //Login Screen
        return (
        <View style={styles.container2}>
          <Text>Username:</Text>
        
          <Text>Password:</Text>   
          <StatusBar style="auto" />
          <View style={styles.buttonContainer}>
              
            <Button
                // Some properties given to Button
                title="Login"
                //onPress={() => Alert.alert('Its GeeksforGeeks !')}
                onPress={() => {
                  //setCount(count = 0)
                  if (counter == 1)
                  {
                    setCounter(counter = 0)
                    setCount(count = null)
                  }
                  else 
                  {
                    setCounter(counter = 1)
                    setCount(count = 0)
                  }
                
                }}
            />
          </View>
        </View> 
      );
    break;
    case 2:     //Account Register Screen


    break;
    case 3:   //Example button code
      return (
      
        <View style={styles.container}>
          <Button
              // Some properties given to Button
              title="Geeks"
              //onPress={() => Alert.alert('Its GeeksforGeeks !')}
              onPress={() => setCount(count = 0)}
          />
        </View>
        );  
    break;
    case 4:     //Logging in Screen


    break;
    case 5:     //Example Pie Chart
     
    break;
    default:
      return (
          <View style={styles.container}>
          <Button
              // Some properties given to Button
              title="Geeks"
              //onPress={() => Alert.alert('Its GeeksforGeeks !')}
              onPress={() => setCount(count = 0)}
          />
        </View>
      );
    break;

  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',  //white
    backgroundColor: '#FFF500', //yellow orange
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',  //white
    //backgroundColor: '#FFF500', //yellow orange
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    margin: 25,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
