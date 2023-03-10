import React from 'react';
import {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import awsconfig from '../../src/aws-exports';
import { useFocusEffect } from '@react-navigation/native';

const MyComponent = () => {
  const data = [
    {
      description: 'Expense 1',
      amount: 100,
      color: colors.primary,
    },
    {
      description: 'Expense 2',
      amount: 200,
      color: colors.secondary,
    },
    {
      description: 'Expense 3',
      amount: 150,
      color: colors.tertiary,
    },
  ];

  const [user, setUser] = useState(null);
  const [theData, setTheData] = useState(expenseDataByCategory);
  //Contains the categories of all expenses, in preperation to obtain only uniques
  const filtering = [];
  //Stored in uniqueVals are the cumulative sums of each unique category.
  const uniqueVals = [];
  //Sets the array to size of the number of unique categories.
  const expenseDataByCategory = [];

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
      fetchUser();
    }, []);






  const getUserExpenses = async () => {
    const variables = {
      filter: {
        userID : {eq: user}
      },
    };
    const newTodo = await API.graphql({ query: queries.listExpenses,  variables});
    filtering.splice(0, filtering.length);
    while (filtering.length > 0)
    {
      filtering.pop();
    }
    while (uniqueVals.length > 0)
    {
      uniqueVals.pop();
    }
    for (let i = 0; i < newTodo.data.listExpenses.items.length; i++) {
      filtering.push(newTodo.data.listExpenses.items[i].category);
    }
    const unique = filtering.filter((value, index, array) => array.indexOf(value) === index);
    //Below forloops handle obtainins the unique values and assigning them to the external const arrays.
    for (let i = 0; i < unique.length; i++) {
      uniqueVals.push(0);
    }
    for (let i = 0; i < newTodo.data.listExpenses.items.length; i++) {
      for (let x = 0; x < unique.length; x++){
        if (newTodo.data.listExpenses.items[i].category == unique[x])
        {
          uniqueVals[x] = uniqueVals[x] + (newTodo.data.listExpenses.items[i].amount);
        }
      }
    }
    //Sets the array to size of the number of unique categories.
    //expenseDataByCategory = new Array(unique.length);
    //Sets each element of the array to be equal to another array, representing the list of expenses for each category
    for (let x = 0; x < unique.length; x++){
      expenseDataByCategory.push();
      expenseDataByCategory[x] = {
        category : unique[x],
        data : []
      };
    }
    //console.log("Length is: " + expenseDataByCategory.length);
    //for all expenses that this use have...
    for (let i = 0; i < newTodo.data.listExpenses.items.length; i++) {
      //For all expense categories the user have defined...
      for (let x = 0; x < unique.length; x++){
        //If the category of the current expense, i,  is the cateogry we are currently looking at, x,
        if (newTodo.data.listExpenses.items[i].category == unique[x])
        {
          //Then add that expenses amount and description to that categories array within expenseDataByCategory
          expenseDataByCategory[x].data.push({
            amount: newTodo.data.listExpenses.items[i].amount,
            description: newTodo.data.listExpenses.items[i].description
          });
        }
      }
    }
   // console.log(unique); 
   // console.log(uniqueVals); 
   // console.log(expenseDataByCategory); 
   // console.log(expenseDataByCategory[0].data);
    //console.log(data);
    setTheData(expenseDataByCategory[0].data);
  }
  //The below focus function processes everything only once, whenever this screen gets focused
  useFocusEffect(React.useCallback(() => 
  {
    uniqueVals.clear;
    filtering.clear;
    expenseDataByCategory.clear;
    getUserExpenses();
    //console.log(theData);
  }));
  
  //console.log(theData);
  //let a = ["1", "1", "2", "3", "3", "1"];
  //let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
  //console.log(unique); 

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  //const chartData = data.map((item) => ({
  const chartData = theData.map((item) => ({
    name: item.description,
    amount: item.amount,
    color: colors.secondary,
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Expense Graphs</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={300}
          height={175}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;
