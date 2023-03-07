import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../config/colors';

//Here we will list all groups you are a part of, alongside any current, total expenses you have made for that group.
      //In the view section you should be able to view / do the following
          //A list of all groups you are in and the current total expenses for them.
            //A button option to enter that group to view expenses for the past option.
            //A button option to expenses by a certain category for the past month.
            //A button option to make an expense.
          //Button option to view total expense for the past month by category.
          //Button option to view the list of all individual expenses of all time.
            //This should take you to some Expense screen where you can fill out a varying list of details for that one expense.
          //Button option to exit the current group.
          //Display somewhere, probably the header, a code unique to that group that others need to join.

    
    //Need a button that exits the groupExpense screen, taking you to you to the PersonalExpense screen.
    //Need some join group prompt with textbox where a user can type in a unique group code.
      //On success that group gets added to the user's list of active groups.
      //On failure, no group is joined.

const GroupData = [
  { id: 'group1', name: 'Group 1', value: 100 },
  { id: 'group2', name: 'Group 2', value: 200 },
];

export default function MyComponent() {
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