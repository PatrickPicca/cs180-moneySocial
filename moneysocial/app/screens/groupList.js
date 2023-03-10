import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const GroupData = [
  { id: 'group1', name: 'Group 1', value: 100 },
  { id: 'group2', name: 'Group 2', value: 200 },
];

export default function MyComponent() {

  const navigation = useNavigation();
  const handleGroupScreen = () => {
    navigation.navigate("CreateGroupScreen");
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.displayBalance}>
      <Text style={styles.displayText}>{`${item.name}: $${item.value}`}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Groups List:</Text>
      <FlatList
        data={GroupData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />



      <TouchableOpacity onPress={handleGroupScreen}>
        <Text>ADD GROUP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  displayBalance: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  displayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
});