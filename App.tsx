import './gesture-handler';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Safe area context
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

// Stack Navigator
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
      <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

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
