import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-web';


export default function App() {

  var nextScreen = 0;
  const screens = {Menu: 0, Next: 1}
  switch (nextScreen)
  {
    case 0:     //Test screen. Use as basis.
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Press the below Button</Text>
          <StatusBar style="auto" />
        </View>

        
      );
    break;
    case 1:     //Login Screen


    break;
    case 2:     //Account Register Scene


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
});
