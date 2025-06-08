import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import UserHeader from '../components/UserHeader';

export default function User() {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    };

    const fetchGoogleData = () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        setGoogleUser(currentUser.providerData);
      }
    };

    fetchUser();
    fetchGoogleData();
  }, []);

  const handleLogout = async () => {
  try {
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut(auth); 
    }

    if (user) {
      const updatedUser = { ...user, signedIn: false };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }

    navigation.navigate('Home');
  } catch (e) {
    console.error('Logout error:', e);
    Alert.alert('Error', 'Failed to logout. Try again.');
  }
};


  const getInitial = () => {
    const name = googleUser[0]?.displayName || user?.name;
    return name?.charAt(0).toUpperCase() || '?';
  };

  const getPhotoURL = () => {
    return googleUser[0]?.photoURL || null;
  };

  const getDisplayName = () => {
    return googleUser[0]?.displayName || user?.name || 'Unknown User';
  };

  const getEmail = () => {
    return googleUser[0]?.email || user?.email || 'Unknown Email';
  };

  if (!user && googleUser.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <UserHeader />
      <View style={styles.content}>
        {getPhotoURL() ? (
          <Image source={{ uri: getPhotoURL() }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitial()}</Text>
          </View>
        )}
        <Text style={styles.name}>{getDisplayName()}</Text>
        <Text style={styles.email}>{getEmail()}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#0a84ff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1e1e1e',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
