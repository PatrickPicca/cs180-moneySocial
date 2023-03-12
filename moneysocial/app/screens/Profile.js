import React, {useCallback} from 'react';
import {useState, useEffect, createContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import colors from '../config/colors';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import awsconfig from '../../src/aws-exports';
import { useFocusEffect } from '@react-navigation/native';


const MyComponent = () => {
  const navigation = useNavigation();

  const data = [
    {
      category: 'Expense 1',
      description: 'Expense 1 Description',
      amount: 100,
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    },
    {
      category: 'Expense 2',
      description: 'Expense 2 Description',
      amount: 200,
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    },
    {
      category: 'Expense 3',
      description: 'Expense 3 Description',
      amount: 150,
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    },
  ];

  const [flag, setFlag] = useState(false);
  const [userFlag, setUserFlag] = useState(true); 
  const [user, setUser] = useState(null);
  const [theData, setTheData] = useState(data);
  const [chartData, setChartData] = useState(theData.map((item) => ({
    category: item.category,
    description: item.description,
    amount: item.amount,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  })));

  //const navigation = useNavigation();

  //Contains the categories of all expenses, in preperation to obtain only uniques
  const [filtering, setFiltering] = useState([]);
  //Stored in uniqueVals are the cumulative sums of each unique category.
  const uniqueVals = [];
  //Sets the array to size of the number of unique categories.
  const expenseDataByCategory = [];

    /*useEffect(() => {
      const fetchUser = async () => {
        try {
          const authUser = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          const userData2 = await API.graphql(
            graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
          );
          console.log("Logged in user: " + authUser.attributes.sub);
          setUser(authUser.attributes.sub);
          console.log("After setting user, user is: " + user);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }; 
      fetchUser();
    }, []);*/

  //The below focus function processes everything only once, whenever this screen gets focused
  useFocusEffect(React.useCallback(() => 
  {
      const getUserExpenses = async () => {

        const fetchUser = async () => {
          
          if (userFlag == true){
            try {
              const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
              });
              const userData2 = await API.graphql(
                graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
              );
              //console.log("Logged in user: " + authUser.attributes.sub);
              setUser(authUser.attributes.sub);
              setFlag(true);
              setUserFlag(false);

              //console.log("After setting user, user is: " + user);
            } catch (error) {
              console.log('Error fetching user data:', error);
            }
          }; 
        }
        fetchUser();
        

       // console.log("About to get user: " + user);

        if(flag == true) 
        {
          setFlag(false);
        //  uniqueVals.clear;
        //  filtering.clear;
        //  expenseDataByCategory.clear;
          const variables = {
            filter: {
              userID : {eq: user}
            },
          };
          //console.log("User IS is: " + user);
          const newTodo = await API.graphql({ query: queries.listExpenses,  variables});
          //console.log(newTodo);
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
              //If the category of the current expense, i,  is the category we are currently looking at, x,
              if (newTodo.data.listExpenses.items[i].category == unique[x])
              {
                //console.log("founditem");
                //Then add that expenses amount and description to that categories array within expenseDataByCategory
                expenseDataByCategory[x].data.push({
                  category: unique[x],
                  amount: newTodo.data.listExpenses.items[i].amount,
                  description: newTodo.data.listExpenses.items[i].description,
                  color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`, 
                });
              }
            }
          }
            // console.log(unique); 
            // console.log(uniqueVals); 
          // console.log(expenseDataByCategory); 
            // console.log(expenseDataByCategory[0].data);
            //console.log(data);
            setTheData(expenseDataByCategory);
              //setSelectedExpense(theData[0].category);
        };
      //setFlag(false);
    };
    getUserExpenses();
    //console.log(theData);
    return () => {flag == false};
  }));
  
  // useFocusEffect(React.useCallback(() => 
  // {
  //   setFlag(true);
  //   return () => {flag == true};
  // }));

React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFlag(true);
      console.log("HELLO!");
  });

  return unsubscribe;
}, [navigation]);

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  /*const chartData = theData.map((item) => ({
    category: item.category,
    description: item.description,
    amount: item.amount,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  }));*/

  //console.log(theData);
  
  const [selectedCategory, setSelectedCategory] = useState(data[0].category);

  const onCategoryChange = (categoryName) => {


    setSelectedCategory(categoryName);

    const unique = filtering.filter((value, index, array) => array.indexOf(value) === index);
          //Below forloops handle obtainins the unique values and assigning them to the external const arrays.
    //console.log(theData);
    
    for (let x = 0; x < unique.length; x++){
      if (categoryName == unique[x])
      //console.log("CategoryName: " + categoryName + " and matching name is: " + unique[x])
      //console.log("test");
      /*console.log(theData[x].data.map((item) => ({
          category: item.category,
          description: item.description,
          amount: item.amount,
          color: item.color,
          legendFontColor: '#7F7F7F',
          legendFontSize: 10,
        })) );*/
        setChartData( theData[x].data.map((item) => ({
          category: item.category,
          description: item.description,
          amount: item.amount,
          color: item.color,
          legendFontColor: '#7F7F7F',
          legendFontSize: 10,
        })) );
        //console.log(chartData);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.label}>Expense Graphs</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={onCategoryChange}
              style={{ color: colors.text }}
            >
              {theData.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.category}
                  value={item.category}
                />
              ))}
            </Picker>
          </View>
          <View style={[styles.chartContainer]}>
            <PieChart
              data={chartData}
              width={300}
              height={170}
              chartConfig={chartConfig}
              accessor="amount"
              center={[75, 0]}
              backgroundColor="transparent"
              hasLegend={false}
            />        
          </View>
          <View>
          {chartData.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 5, marginVertical: 10, marginHorizontal: 20}} />
              <Text style={{ fontSize: 12 }}>{item.description}</Text>
              <Text style={{ fontSize: 12 }}>{", $" + item.amount}</Text>
            </View>
          ))}
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
  pickerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;