import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
export default function CustomHeader({ screen }) {
  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const loadAvatar = async () => {
        const profile = await AsyncStorage.getItem('profile');
        if (profile) {
          const parsedProfile = JSON.parse(profile);
          setAvatar(parsedProfile.avatar);
          setFirstName(parsedProfile?.firstName);
          setLastName(parsedProfile?.lastName);
        }
      };

      loadAvatar();
    }, []),
  );

  return (
    <View style={[styles.headerContainer]}>
      {screen == 'Profile' && (
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.profileInitialLetterContainer}>
            <Ionicons
              name='arrow-back-outline'
              size={20}
              color={colors.primary1}
            />
          </View>
        </TouchableOpacity>
      )}

      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        {avatar ? (
          <Image
            source={
              avatar ? { uri: avatar } : require('../../assets/profile.png')
            }
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileInitialLetterContainer}>
            <Text style={styles.letter}>
              {firstName ? firstName[0] : '?'} {lastName ? lastName[0] : ''}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.white,
    height: 60,
    elevation: 3,
    shadowColor: colors.secondary4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },

  profileImageContainer: {
    position: 'absolute',
    right: 10,
  },
  goBack: {
    position: 'absolute',
    left: 10,
  },
  profileInitialLetterContainer: {
    width: 40, // Fixed width for the letter container
    height: 40, // Fixed height for the letter container
    borderRadius: 20, // Makes the container circular
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: colors.secondary3,
  },
  letter: {
    fontSize: 20,
    textAlign: 'center', // Center text horizontally
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
