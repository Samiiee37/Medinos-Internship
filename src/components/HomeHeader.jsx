import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';

const HomeHeader = () => {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const checkGoogleUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const providers = currentUser.providerData;
        console.log('Provider Data:', providers);
        setGoogleUser(providers);
      } else {
        console.log('No user signed in via Google');
      }
    };

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
    checkGoogleUser();
  }, []);

  const handleProfilePress = () => {
    if (googleUser.length > 0 || user?.signedIn) {
      navigation.navigate('User');
    } else {
      navigation.navigate('Signin');
    }
  };

  const getInitial = () => {
    if (googleUser.length > 0 && googleUser[0].displayName) {
      return googleUser[0].displayName.charAt(0).toUpperCase();
    } else if (user?.signedIn && user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return '?';
  };

  const getGreeting = () => {
    if (googleUser.length > 0 && googleUser[0].displayName) {
      return `Hi, ${googleUser[0].displayName.split(' ')[0]}`;
    } else if (user?.signedIn && user?.name) {
      return `Hi, ${user.name.split(' ')[0]}`;
    } else {
      return 'Please SignIn';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={googleUser.length > 0 || user?.signedIn ? styles.welcomeText : styles.signInText}>
          {getGreeting()}
        </Text>

        <TouchableOpacity
          style={[
            styles.profileButton,
            user?.signedIn || googleUser.length > 0
              ? styles.signedInButton
              : styles.signedOutButton,
          ]}
          onPress={handleProfilePress}
        >
          {googleUser.length > 0 && googleUser[0].photoURL ? (
            <Image
              source={{ uri: googleUser[0].photoURL }}
              style={styles.profileImage}
            />
          ) : (
            <Text
              style={[styles.profileInitial, !user?.signedIn && { color: '#333' }]}
            >
              {getInitial()}
            </Text>
          )}
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
    overflow: 'hidden',
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
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});

export default HomeHeader;
