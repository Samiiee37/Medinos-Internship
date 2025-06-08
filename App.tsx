// Import gesture handler at the top (correct syntax for React Native)
import 'react-native-gesture-handler';

// Imports
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//Navigator


export default function App() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>App</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});