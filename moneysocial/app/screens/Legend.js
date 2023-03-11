import React from 'react';
import { View, Text } from 'react-native';

const Legend = ({ data }) => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 5 }} />
          <Text style={{ fontSize: 12 }}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default Legend;
