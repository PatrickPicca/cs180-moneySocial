import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Keyboard, Text, TextInput, StyleSheet, View} from 'react-native';


class Example extends Component {
  state = {
    keyboardStatus: '',
  };

  componentDidMount() {
    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({keyboardStatus: 'Keyboard Shown'});
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({keyboardStatus: 'Keyboard Hidden'});
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
  }

  render() {
    return (
      <View style={style.container}>
        <TextInput
          style={style.input}
          placeholder="Click here…"
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={style.status}>{this.state.keyboardStatus}</Text>
      </View>
    );
  }
}
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 10,
   textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() 
{
  return (
    <View style={styles.container}>
      <Text>testing</Text>
      <View
      style={{
        flexDirection: 'row',
        height: 80,
        padding: 20,
      }}>
        <TextInput
          style={style.input}
          placeholder="Click here…"
          onSubmitEditing={Keyboard.dismiss}
        />
      <StatusBar style="auto" />
      
      </View>
    </View>
  );
}

