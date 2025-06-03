import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Detail({ route, navigation }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#007AFF' }}>{'< Back'}</Text>
      </TouchableOpacity>

      <Image source={{ uri: user.ImageUrl }} style={styles.image} />
      <Text style={styles.name}>{user.Name}</Text>
      <Text>Email: {user.Email}</Text>
      <Text>Phone: {user.PhoneNumber}</Text>
      <Text>Gender: {user.Gender}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
