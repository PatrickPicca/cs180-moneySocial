import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TextInput, Pressable, TouchableOpacity, Alert } from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateExpenseScreen from '../createExpenseScreen';
import colors from '../../config/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getGroup } from '../../../src/graphql/queries';
import * as queries from '../../../src/graphql/queries';
import * as mutations from '../../../src/graphql/mutations';
import awsconfig from '../../../src/aws-exports';
import { AuthPiece } from 'aws-amplify-react-native';
API.configure(awsconfig);

function GroupHome(props) {

  const { id } = props;
  const navigation = useNavigation();
  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchGroup();
    }, [])
  );

  const fetchGroup = async () => {
    try {
      const result = await API.graphql(graphqlOperation(getGroup, { id: id }));
      setGroup(result?.data?.getGroup);
    } catch (error) {
      console.log('Error fetching user groups', error);
    }
  };

  const handleCreateGroupExpenseScreen = (id) => {
    navigation.navigate('CreateGroupExpense', {id: id});
  }

  //deleteGroupHandler is not completed here because
  //not everyone should be able to delete the group, yet we lack
  //a groupOwner field, so I just merged it with leaveGroupHandler.
  //When the last person leaves the group, the group is automatically deleted.

  // const deleteGroupHandler = async (id) => {
  //   console.log("In delete group handler");
  //   Alert.alert(
  //     "Delete Group",
  //     "Are you sure you want to delete this group?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => {
  //         console.log("OK Pressed");
  //         let variables = {
  //           groupId: id
  //         }
  //         let result = API.graphql({query: queries.userGroupsByGroupId, variables: variables});
  //         let users = result.data.userGroupsByGroupId.items;
          


  const leaveGroupHandler = async (id) => {
        console.log("In delete group handler");
        let variables = {
          groupId: id
        }
        let result = await API.graphql({query: queries.userGroupsByGroupId, variables: variables});
        let recordId;
        // console.log(result.data.userGroupsByGroupId.items.length);
        let authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
        let userInfo = await API.graphql({query: queries.getUser, variables: {id: authUser.attributes.sub}});
        let userId = userInfo.data.getUser.id;
        let found = false;
        for(let i = 0; i < result.data.userGroupsByGroupId.items.length; i++) {
          if(result.data.userGroupsByGroupId.items[i].userId == userId) {
            recordId = result.data.userGroupsByGroupId.items[i].id;
            found = true;
            break;
          }
        }
        if(!found) {
          Alert.alert("Error", "You are not a member of this group");
          return;
        }
        // console.log(userInfo.data.getUser.id);
        
        Alert.alert("Are you sure you want to leave the group \"" + group.name + "\"?", "You will no longer be able to see the group's expenses or add expenses to the group.", [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
              return;
            }
          }
          ,
          {
            text: "Ok",
            onPress: async () => {
            console.log("Ok Pressed");
            variables = {
              input: {
                id: recordId
              }
            }
            await API.graphql({query: mutations.deleteUserGroup, variables: variables});
            console.log("Successfully left group");
            if(result.data.userGroupsByGroupId.items.length == 1) {
              variables = {
                input: {
                  id: id
                }
              }
              await API.graphql({query: mutations.deleteGroup, variables: variables});
              console.log("Successfully deleted group");
            }
            navigation.goBack();
          }
        }
        ]);
        //if the user is the only member of the group, delete the group
  }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText} >{'Welcome ' + group?.name + '!'}</Text>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={() => leaveGroupHandler(id, group)}>
          <Text style={styles.text}>{"Leave Group"}</Text>
        </Pressable>
      </View>
      
      <TouchableOpacity onPress={() => handleCreateGroupExpenseScreen(id)} style={styles.bottombutton}>
        <Ionicons name="add" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.background,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5,
    paddingTop: 20,
    paddingLeft: 15,
    paddingBottom: 20
  },
  bottombutton: {
    backgroundColor: colors.primary,
    height: 55,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 5,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'pink'
  },
  button: {
    backgroundColor: colors.accent,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
})

export default GroupHome;
