import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Dimensions, TextInput, Pressable, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import awsconfig from '../../src/aws-exports';
API.configure(awsconfig);


function CreateExpenseScreen() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          const userData2 = await API.graphql(
            graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
          );
         // console.log("In createExpenseScreen. User id: " + authUser.attributes.sub);
          setUser(authUser.attributes.sub);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }; 
      fetchUser();
    }, []);




  const handleBack = () => {
    navigation.pop();
  };
  const handleCreateExpense = async () => {
    const variables = {
      input: {
        amount: amount, 
        description: desc,
        userID: user,
        groupID: "Null",
        category: category
      },
    };
    const newTodo = await API.graphql({ query: mutations.createExpense, variables});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Expense:</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={(value) => setCategory(value)}
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
        placeholder="Amount"
        keyboardType="number-pad"
        value={amount}
        onChangeText={(value) => setAmount(value)}
      />

      <TouchableOpacity style={styles.returnbutton} onPress={handleBack}>
        <Ionicons name={'arrow-back-outline'} size={40} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.returnbutton} onPress={handleCreateExpense}>
        <Ionicons name={'arrow-forward-outline'} size={40} />
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
    returnbutton: {
      backgroundColor: colors.primary,
      height: 50,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 70,
      marginVertical: 10,
      borderWidth: 2,
      borderColor: 'white',
      alignSelf: 'center'
    },
    label: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
      marginHorizontal: 20,
    },
  });
  

export default CreateExpenseScreen;
