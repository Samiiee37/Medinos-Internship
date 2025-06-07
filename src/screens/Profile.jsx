import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('Error loading user from AsyncStorage:', err);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading profile...</Text>
      </View>
    );
  }

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <View style={styles.container}>
      {user.imageUrl ? (
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>{initials}</Text>
        </View>
      )}
      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>
        This is your profile screen. You can add more personal info here later.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  initialsCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  initialsText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
  },
  loading: {
    fontSize: 16,
    color: '#888',
  },
});
