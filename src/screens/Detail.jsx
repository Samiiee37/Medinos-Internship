import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Headertwo from '../components/Headertwo';

export default function Detail({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.screen}>
      <Headertwo username={user.Name} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: user.ImageUrl }} style={styles.image} />
          <Text style={styles.name}>{user.Name}</Text>
          <Text style={styles.info}>📧 Email: {user.Email}</Text>
          <Text style={styles.info}>📞 Phone: {user.PhoneNumber}</Text>
          <Text style={styles.info}>👤 Gender: {user.Gender}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    width: '100%',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
});
