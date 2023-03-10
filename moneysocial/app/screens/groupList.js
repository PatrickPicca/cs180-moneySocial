import React, { useState, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createGroup, createUserGroup } from '../../src/graphql/mutations';
import { getGroup, listUserGroups, userGroupsByUserId } from '../../src/graphql/queries';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function GroupList() {

  const navigation = useNavigation();


  const handleGroupScreen = () => {
    navigation.navigate("CreateGroupScreen");
  }
  const handleJoinScreen = () => {
    navigation.navigate("JoinGroupScreen");
  }

  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useFocusEffect(
    React.useCallback(() => {
      fetchUserGroups();
    }, [])
  );
  
    const fetchUserGroups = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userId = userInfo.attributes.sub;
        const result = await API.graphql(graphqlOperation(userGroupsByUserId, { userId }));
        const userGroupsData = result.data.userGroupsByUserId.items;
        setUserGroups(userGroupsData);
        const groupIds = userGroupsData.map(group => group.groupId);
        console.log(groupIds);
        const groups = [];
        for (const groupId of groupIds) {
          const group = await API.graphql(graphqlOperation(getGroup, { id: groupId }));
          groups.push(group.data.getGroup);
        }
        setGroups(groups);
        console.log(groups);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user groups', error);
      }
    };
  
    const renderGroup = ({ item }) => {
      return (
        <TouchableOpacity style={styles.groupItem}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.keyText}>Key: {item.groupKey}</Text>
          <Text style={styles.idText}>Group ID: {item.id}</Text>
        </TouchableOpacity>
      );
    };
    
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <SafeAreaView style={styles.container}>
          <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={item => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={<Text>No user groups found</Text>}
          style={styles.groupListContainer}
          />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinScreen}>
            <Text style={styles.createText}>Join Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={handleGroupScreen}>
            <Text style={styles.createText}>Create Group</Text>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
      
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  createText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '49%',
  },
  joinButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '49%',
  },
});