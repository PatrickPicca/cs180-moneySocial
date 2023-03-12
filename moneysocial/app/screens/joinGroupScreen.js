import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createGroup, createUserGroup } from '../../src/graphql/mutations';
import { listGroups, listUserGroups } from '../../src/graphql/queries';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

export default function JoinGroupScreen() {
  const [groupKey, setGroupKey] = useState('');
  const [groupId, setGroupId] = useState(null); // initialize group id to null
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        console.log(authUser.attributes.sub);
        setUser(authUser.attributes.sub);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    }; 
    fetchUser();
  }, []);
  const searchGroups = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listGroups, { filter: { groupKey: { eq: groupKey } } }));
      setGroups(response.data.listGroups.items);
    } catch (error) {
      console.log(error);
    }
  }
  
  

  const handleGoBack = () => {
    navigation.popToTop();
  }
  const handleJoinGroup = async (id) => {
    try {
      setGroupId(id);
  
      // Check if the user is already a member of the group
      const userGroupFilter = {
        userId: { eq: user },
        groupId: { eq: id }
      };
      const userGroupResult = await API.graphql(graphqlOperation(listUserGroups, { filter: userGroupFilter }));
      const existingUserGroup = userGroupResult.data.listUserGroups.items[0];
  
      if (existingUserGroup) {
        // The user is already a member of the group
        console.log(`User ${user} is already a member of group ${id}`);
      } else {
        // The user is not a member of the group - create a new user group
        const userGroupInput = {
          groupId: id,
          userId: user,
          // add other fields as necessary
        };
        const userGroupResult = await API.graphql(
          graphqlOperation(createUserGroup, { input: userGroupInput })
        );
        const createdUserGroup = userGroupResult.data.createUserGroup;
        console.log('Created user group:', createdUserGroup);
        navigation.pop();

      }
  
    } catch (error) {
      console.log('Error creating group', error);
    }
  };
  
  
  const renderGroup = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleJoinGroup(item.id)} style={styles.groupItem}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.keyText}>Key: {item.groupKey}</Text>
        <Text style={styles.idText}>Group ID: {item.id}</Text>
      </TouchableOpacity>
    );
  };



  return (
    <SafeAreaView style={styles.body}>

        <View style={styles.searchContainer}>
            <TextInput
            style={styles.input}
            placeholder="Search Group Key"
            onChangeText={(value) => setGroupKey(value)}
            />
            <TouchableOpacity style={styles.searchButton} onPress={searchGroups}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>

        <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={item => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.groupListContainer}
          />


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Cancel</Text>
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
    searchContainer: {
        alignItems: 'center',
        flex: 1,
        padding: 5,
      },
      groupListContainer: {
        paddingVertical: 15,
        paddingHorizontal: 8,
      },
      groupItem: {
        justifyContent: 'space-between',
        marginVertical: 8,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 10,
      },
      groupName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
      },
      keyText: {
        color:'#fff',
        fontSize: 14,
      },
      idText: {
        fontSize: 10,
        color: '#fff',
      },
      searchButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
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
        width: '100%',
      },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
})
