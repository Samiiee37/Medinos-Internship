import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const Detail = ({ route }) => {
  const { user } = route.params;
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: user.ImageUrl }} 
          style={[styles.detailImage, { width: screenWidth }]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailName}>{user.Name}</Text>
        <Text style={styles.detailText}>Email: {user.Email}</Text>
        <Text style={styles.detailText}>Phone: {user.PhoneNumber}</Text>
        <Text style={styles.detailText}>Gender: {user.Gender}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#f5f5f5',
  },
  detailImage: {
    height: undefined,
    aspectRatio: 1, // Assuming square images, adjust if needed
  },
  detailContent: {
    padding: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default Detail;