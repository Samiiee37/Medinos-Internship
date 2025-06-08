import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const storeData = async (userData) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return true;
  } catch (e) {
    console.error('Error saving user data:', e);
    return false;
  }
};

  const handleSignup = async () => {
  if (validate()) {
    const userData = {
      name,
      email,
      password,
      signedIn: false
    };
    
    const success = await storeData(userData);
    if (success) {
      console.log('Signup successful, user stored:', userData);
      setName('');
      setEmail('');
      setPassword('');
      navigation.navigate('Home')
    }
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.innerContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create an Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={text => {
              setName(text);
              setErrors(prev => ({...prev, name: ''}));
            }}
            placeholderTextColor="#999"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrors(prev => ({...prev, email: ''}));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors(prev => ({...prev, password: ''}));
            }}
            secureTextEntry
            placeholderTextColor="#999"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  innerContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#1e1e1e',
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
  },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#0a84ff',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  errorText: {
    color: '#e53935',
    fontSize: 13,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
});
