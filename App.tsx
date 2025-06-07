import './gesture-handler';

import React = require('react');
import { View, Text, StyleSheet } from 'react-native';

// Safe area context and navigation 
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

//components
//import StackNavigator from './src/navigation/stacknavigator';
import StackNavigator from './src/navigation/stacknavigator';


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f2f2f2',
  }
});
