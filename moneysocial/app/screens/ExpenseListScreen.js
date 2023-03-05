import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';

const GroupData = [
  {name: 'Soda', value: 2.99 },
  {name: 'Chips', value: 1.99 },
];

export default function MyComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const renderItem = ({ item }) => (
    <View style={styles.displayBalance}>
      <Text style={styles.displayText}>{`${item.name}: $${item.value}`}</Text>
    </View>
  );

  const filteredData = GroupData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Filter expenses"
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
        />
      </View>
      <FlatList
        data={filteredData}
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
    borderBottomColor: 'gray',
  },
  displayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
});