import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';

const GroupData = [
  {id: '1', name: 'Soda', value: 2.99 },
  {id: '2', name: 'Chips', value: 1.99 },
];

export default function MyComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(GroupData);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.displayBalance}>
      {editingId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            placeholder="Enter new name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.editInput}
            placeholder="Enter new value"
            value={value}
            onChangeText={text => setValue(text)}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdate(item.id)}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <Text style={styles.displayText}>{`${item.name}: $${item.value}`}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setValue(item.value.toString());
  };

  const handleUpdate = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, name, value: parseFloat(value) };
      }
      return item;
    });
    setData(updatedData);
    setEditingId(null);
    setName('');
    setValue('');
  };

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Expense List:</Text>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingTop: 20,
  },
})
