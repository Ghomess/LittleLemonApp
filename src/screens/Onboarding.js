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
import WelcomeViewHome from '../components/WelcomeViewHome';
import { colors } from '../utils/colors';

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
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      <WelcomeViewHome onBoarding={true} />
      <View style={styles.items}>
        <TextInput
          style={styles.input}
          placeholder='First Name *'
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize='words'
        />
        <TextInput
          style={styles.input}
          placeholder='Email *'
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    paddingHorizontal: 16,
    width: '100%',
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: colors.secondary4, // Dark gray color
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.secondary4,
    borderRadius: 5,
    backgroundColor: colors.secondary3, // White background for inputs
  },
  button: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.primary1, // Green color when enabled
  },
  buttonDisabled: {
    backgroundColor: colors.secondary3, // Gray color when disabled
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});
