import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

function CreateExpenseScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('');

  const handleCreateExpense = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={desc}
        onChangeText={(value) => setDesc(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Set Priority"
        keyboardType="number-pad"
        value={priority}
        onChangeText={(value) => setPriority(value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateExpense}>
        <Ionicons name={'add'} size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#C0C0C0',
      borderRadius: 20,
      backgroundColor: '#fff',
      fontSize: 20,
      marginVertical: 10,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    button: {
      backgroundColor: colors.primary,
      height: 55,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      marginVertical: 10,
      borderWidth: 2,
      borderColor: 'white',
      alignSelf: 'center',
    },
  });
  

export default CreateExpenseScreen;
