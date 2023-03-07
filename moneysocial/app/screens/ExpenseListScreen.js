import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
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
          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemove(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>

          </View>
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

  const handleRemove = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  editContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
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
  editContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  updateButton: {
    backgroundColor: 'green',
    paddingTop: 2,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center'
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
})
