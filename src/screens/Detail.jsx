import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import DetailHeader from '../components/DetailHeader';

const Detail = ({ route }) => {
  const { user } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetailHeader />
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: user.ImageUrl }} 
          style={styles.profileImage}
          resizeMode="cover"
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
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  detailContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  detailName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
});

export default Detail;
