import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import colors from '../config/colors';

const chartContainerWidth = Dimensions.get('window').width * 0.9; // 90% of screen width
const chartContainerHeight = chartContainerWidth * 0.8; // 80% of chart width

const MyComponent = () => {
  const data = [
    {
      name: 'Expense 1',
      amount: 100,
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    },
    {
      name: 'Expense 2',
      amount: 200,
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    },
    {
      name: 'Expense 3',
      amount: 150,
      color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    },
  ];

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const chartData = data.map((item) => ({
    name: item.name,
    amount: item.amount,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  }));

  const [selectedExpense, setSelectedExpense] = useState(data[0].name);

  const onExpenseChange = (expenseName) => {
    setSelectedExpense(expenseName);
  };

  return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.label}>Expense Graphs</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedExpense}
            onValueChange={onExpenseChange}
            style={{ color: colors.text }}
          >
            {data.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.name}
                value={item.name}
              />
            ))}
          </Picker>
        </View>
        <View style={[styles.chartContainer]}>
          <PieChart
            data={chartData.filter((item) => item.name === selectedExpense)}
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
        {data.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 5, marginVertical: 10, marginHorizontal: 20}} />
            <Text style={{ fontSize: 12 }}>{item.name}</Text>
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