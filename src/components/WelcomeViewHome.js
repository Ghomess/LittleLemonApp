import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import { colors } from '../utils/colors';

const WelcomeViewHome = ({ searchQuery, setSearchQuery, onBoarding }) => {
  return (
    <View style={styles.littleLemonContainer}>
      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.littleLemonSubContainer}>
        <View style={{ width: '50%' }}>
          <Text style={styles.location}>Chicago</Text>
          <Text style={styles.littleLemonContainerdescription}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>

        <Image
          source={{
            uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/bruschetta.jpg?raw=true',
          }}
          style={styles.lemonImage}
        />
      </View>
      {!onBoarding && (
        <View
          style={{
            width: '100%',
          }}>
          <SearchBar
            placeholder='Search items'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for LittleLemonComponent
  littleLemonContainer: {
    padding: 20,
    backgroundColor: colors.primary1, // Background color similar to the image
    width: '100%',
  },
  littleLemonSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary2, // Yellow title color
    marginBottom: 10,
  },
  littleLemonContainerdescription: {
    fontSize: 14,
    color: colors.secondary3,
  },
  location: {
    fontSize: 24,
    color: colors.secondary3,
    marginBottom: 20,
  },
  lemonImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  searchIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.secondary3,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  searchText: {
    fontSize: 24,
  },
});

export default WelcomeViewHome;
