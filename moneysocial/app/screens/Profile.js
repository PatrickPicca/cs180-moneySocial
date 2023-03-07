import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import colors from '../config/colors';

const MyComponent = () => {
  const data = [
    {
      name: 'Expense 1',
      amount: 100,
      color: colors.primary,
    },
    {
      name: 'Expense 2',
      amount: 200,
      color: colors.secondary,
    },
    {
      name: 'Expense 3',
      amount: 150,
      color: colors.tertiary,
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
