import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createGroup, createUserGroup } from '../../src/graphql/mutations';
import { getUser } from '../../src/graphql/queries';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [groupKey, setGroupKey] = useState('');
  const [groupId, setGroupId] = useState(null); // initialize group id to null
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        const userData2 = await API.graphql(
            graphqlOperation(getUser, { id: authUser.attributes.sub })
          );
        console.log(authUser.attributes.sub);
        setUser(authUser.attributes.sub);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    }; 
    fetchUser();
  }, []);

  const handleGoBack = () => {
    navigation.popToTop();
  }
  const handleCreateGroup = async () => {
    try {
      const input = {
        name: groupName,
        groupKey: groupKey,
        // add other fields as necessary
      };
      const result = await API.graphql(graphqlOperation(createGroup, { input }));
      const createdGroup = result.data.createGroup;
      setGroupId(createdGroup.id); // set group id after creating group
  
      // create user group
      const userGroupInput = {
        groupId: createdGroup.id,
        userId: user,
        // add other fields as necessary
      };
      const userGroupResult = await API.graphql(
        graphqlOperation(createUserGroup, { input: userGroupInput })
      );
      const createdUserGroup = userGroupResult.data.createUserGroup;
      console.log('Created user group:', createdUserGroup);
      navigation.pop();
    } catch (error) {
      console.log('Error creating group', error);
    }
  };
  



  return (
    <SafeAreaView style={styles.body}>
    <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder="Group Name"
        onChangeText={(value) => setGroupName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Group Key"
        onChangeText={(value) => setGroupKey(value)}
      />
    </View>



      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.buttonText}>GO BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleCreateGroup}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'left',
        padding: 10,
        width: '100%',
        margin: 10,
    },
    inputContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 5,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
      },
    backButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
      },
      confirmButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
      },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
})
