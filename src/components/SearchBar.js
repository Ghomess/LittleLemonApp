import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or another icon library

export default function SearchBar({ placeholder, onChangeText, value }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name='search'
        size={20}
        color='#495E57'
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor='#888'
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
    backgroundColor: '#E0E0E0', // Light gray background
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
    color: '#495E57',
  },
});
