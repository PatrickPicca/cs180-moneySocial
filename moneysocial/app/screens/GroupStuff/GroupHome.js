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
import awsconfig from '../../../src/aws-exports';
API.configure(awsconfig);

function GroupHome(props) {

  const { id } = props;
  const navigation = useNavigation();
  const [group, setGroup] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText} >{'Welcome ' + group?.name + '!'}</Text>

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
})

export default GroupHome;
