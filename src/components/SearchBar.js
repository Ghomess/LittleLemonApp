import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or another icon library
import { colors } from '../utils/colors';

export default function SearchBar({ placeholder, onChangeText, value }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name='search'
        size={20}
        color={colors.primary1}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.secondary3}
        onChangeText={onChangeText}
        value={value}
        cursorColor={'black'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary3, // Light gray background
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.primary1,
  },
});
