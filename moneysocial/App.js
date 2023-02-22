import { StyleSheet, Text, View } from 'react-native';
import MainNavigation from './app/Routes/MainNavigation';

export default function App() {
  return <MainNavigation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() 
{
  return (
    <View style={styles.container}>
      <Text>testing</Text>
      <View
      style={{
        flexDirection: 'row',
        height: 80,
        padding: 20,
      }}>
        <TextInput
          style={style.input}
          placeholder="Click here…"
          onSubmitEditing={Keyboard.dismiss}
        />
      <StatusBar style="auto" />
      
      </View>
    </View>
  );
}

