import 'react-native-gesture-handler'; 
import React from 'react';
import { StyleSheet } from 'react-native';
//safe-area-view
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//navigator
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/Navigator'; 

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});