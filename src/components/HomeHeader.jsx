import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeHeader = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleProfilePress = () => {
    if (user?.signedIn) {
      navigation.navigate('User');
    } else {
      navigation.navigate('SignIn');
    }
  };

  const getInitial = () => {
    if (user?.signedIn && user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {user?.signedIn ? (
          <Text style={styles.welcomeText}>Hi, {user.name.split(' ')[0]}</Text>
        ) : (
          <Text style={styles.signInText}>Please SignIn</Text>
        )}

        <TouchableOpacity
          style={[
            styles.profileButton,
            user?.signedIn ? styles.signedInButton : styles.signedOutButton,
          ]}
          onPress={handleProfilePress}
        >
          <Text
            style={[
              styles.profileInitial,
              !user?.signedIn && { color: '#333' },
            ]}
          >
            {getInitial()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#2C3E50',
  },
  signInText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  signedInButton: {
    backgroundColor: '#3498db',
  },
  signedOutButton: {
    backgroundColor: '#ecf0f1',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default HomeHeader;
