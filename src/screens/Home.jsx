import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader'; 

export default function Home({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('Please Sign In');
  const [screen, setScreen] = useState('Signin');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://dummyjson.com/c/bb8d-b76d-4113-aec3'
        );
        setUsers(response.data); 
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.signedIn === true && user.fullName) {
            setUsername(user.fullName);
            setScreen('Profile');
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUsers();
    fetchUserInfo();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { user: item })}
    >
      <Image source={{ uri: item.ImageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.Name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader username={username} screen={screen}/>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
