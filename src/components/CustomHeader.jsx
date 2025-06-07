import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({ username, screen }) {
  const navigation = useNavigation();

  const initial =
    username && username !== 'Please Sign In'
      ? username.charAt(0).toUpperCase()
      : '?';

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}</Text>

      <TouchableOpacity
        style={styles.initialCircle}
        onPress={() => navigation.navigate(screen)}
      >
        <Text style={styles.initialText}>{initial}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  initialCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
