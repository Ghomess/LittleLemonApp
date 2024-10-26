import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function OnboardingScreen({ navigation, completeOnboarding }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const isFirstNameValid = /^[a-zA-Z]+$/.test(firstName);
    const isEmailValid = emailRegex.test(email);
    setIsButtonDisabled(!(isFirstNameValid && isEmailValid));
  }, [firstName, email]);

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem(
        'profile',
        JSON.stringify({ firstName, email }),
      );
      completeOnboarding();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://your-image-url.com/little-lemon-logo.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Let us get to know you</Text>
      <TextInput
        style={styles.input}
        placeholder='First Name'
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize='words'
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TouchableOpacity
        style={[
          styles.button,
          isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled,
        ]}
        onPress={handleNext}
        disabled={isButtonDisabled}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d6db', // Matches the background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2a3c44', // Dark gray color
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#2a3c44', // Border color similar to the inputs in the design
    borderRadius: 5,
    backgroundColor: '#fff', // White background for inputs
  },
  button: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#5cb85c', // Green color when enabled
  },
  buttonDisabled: {
    backgroundColor: '#ccc', // Gray color when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
