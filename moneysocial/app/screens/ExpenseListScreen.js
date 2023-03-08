import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import colors from '../config/colors';
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../src/mutations';
import * as queries from '../../src/queries';

const GroupData = [
  {id: '1', category: 'Soda', amount: 2.99, description: "test" },
  {id: '2', category: 'Chips', amount: 1.99, description: "test" },
];

export default function MyComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(GroupData);
  const [editingId, setEditingId] = useState(null);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [user, setUser] = useState(null);

  const getAllUserExpenses = async () => {
    //This block of code queries a specified expense object
   // console.log("In getAllUSerExpenses handler");
    const variables = {
      filter: {
        userID : {eq: user}
      },
    };
    const newTodo = await API.graphql({ query: queries.listExpenses,  variables});
 //   console.log(newTodo.data.listExpenses.items);
    setData(newTodo.data.listExpenses.items);
  }

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          const userData2 = await API.graphql(
            graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
          );
          console.log(authUser.attributes.sub);
          setUser(authUser.attributes.sub);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }; 
      getAllUserExpenses();
      fetchUser();
    }, []);
    
    
  // console.log(data);

  const renderItem = ({ item }) => (
    <View style={styles.displayBalance}>
      {editingId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            placeholder="Enter new category"
            value={category}
            onChangeText={text => setCategory(text)}
          />
          <TextInput
            style={styles.editInput}
            placeholder="Enter new value"
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <TextInput
            style={styles.editInput}
            placeholder="Enter new description"
            value={description}
            onChangeText={text => setDescription(text)}
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
          <Text style={styles.displayText}>{`${item.category}: $${item.amount}`}</Text>
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
    setCategory(item.category);
    setDescription(item.description);
    setAmount(item.amount.toString());
  };

  const handleUpdate =async (id) => {

    //Need to log the id to see if its represents the expenses's unique id.
    //Need to run update query based on current values stored for that expense.

    const variables2 = {
      id : id,
      amount : amount,
      description : description,
      category : category
    };
    const newTodo2 = await API.graphql({ query: mutations.updateExpense,  variables: { input: variables2 }});
    getAllUserExpenses();
    /*
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, category, amount: parseFloat(amount) };
      }
      return item;
    });
    setData(updatedData);
    */
    setEditingId(null);
    setCategory('');
    setAmount('');
    setDesc('');
  };

  const handleRemove = async (id) => {
    const theID = id;
    console.log("id in question: " + id);
    const variables = {
      input: {
        id : theID
      },
    };
    const newTodo = await API.graphql({ query: mutations.deleteExpense,  variables});
    //const updatedData = data.filter(item => item.id !== id);

    //Instead of defining updatedData, we simply will use a mutation to delete that expense.
    getAllUserExpenses();

    //setData(updatedData);
  };

  const filteredData = data.filter(item => item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  
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
