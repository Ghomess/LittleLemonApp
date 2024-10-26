import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [orderStatus, setOrderStatus] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const navigation = useNavigation();
  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('profile');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setFirstName(parsedData.firstName);
        setLastName(parsedData.lastName || ''); // Add last name if present
        setEmail(parsedData.email);
        setPhoneNumber(parsedData.phoneNumber || ''); // Add phone number if present
        setAvatar(parsedData.avatar || null); // Add avatar if present
        setOrderStatus(parsedData.orderStatus || false);
        setPasswordChanges(parsedData.passwordChanges || false);
        setSpecialOffers(parsedData.specialOffers || false);
        setNewsletter(parsedData.newsletter || false);
      }
    } catch (e) {
      console.error('Failed to load user data', e);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const saveChanges = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        avatar,
        orderStatus,
        passwordChanges,
        specialOffers,
        newsletter,
      };
      await AsyncStorage.setItem('profile', JSON.stringify(profileData));
      console.log('Changes saved successfully');
    } catch (e) {
      console.error('Failed to save changes', e);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('onboardingComplete');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  };

  const toggleCheckbox = (setter, value) => {
    setter(!value); // Toggle the checkbox value
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      {/* Avatar Image */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.initials}>
              {firstName ? firstName[0] : '?'} {lastName ? lastName[0] : ''}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.changeButton}
          onPress={handleImagePick}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => setAvatar(null)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>

      {/* First Name Input */}
      <TextInput
        style={styles.input}
        placeholder='First Name'
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Last Name Input */}
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType='phone-pad'
        maxLength={14} // USA phone number length
      />

      {/* Email Notifications */}
      <Text style={styles.notificationsTitle}>Email Notifications</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => toggleCheckbox(setOrderStatus, orderStatus)}>
          <View
            style={[styles.checkbox, orderStatus && styles.checkboxChecked]}>
            {orderStatus && <Text style={styles.checkboxText}>✓</Text>}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Order statuses</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => toggleCheckbox(setPasswordChanges, passwordChanges)}>
          <View
            style={[
              styles.checkbox,
              passwordChanges && styles.checkboxChecked,
            ]}>
            {passwordChanges && <Text style={styles.checkboxText}>✓</Text>}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Password changes</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => toggleCheckbox(setSpecialOffers, specialOffers)}>
          <View
            style={[styles.checkbox, specialOffers && styles.checkboxChecked]}>
            {specialOffers && <Text style={styles.checkboxText}>✓</Text>}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Special offers</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => toggleCheckbox(setNewsletter, newsletter)}>
          <View style={[styles.checkbox, newsletter && styles.checkboxChecked]}>
            {newsletter && <Text style={styles.checkboxText}>✓</Text>}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Newsletter</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#d1d6db',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2a3c44',
  },
  avatarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  initials: {
    fontSize: 40,
    color: '#fff',
  },
  changeButton: {
    backgroundColor: '#5cb85c',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  changeButtonText: {
    color: '#fff',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#2a3c44',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  notificationsTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#2a3c44',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#2a3c44',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#5cb85c',
  },
  checkboxText: {
    color: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#2a3c44',
  },
  buttonContainer: {
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#5cb85c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
