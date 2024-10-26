import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ListCategories({ onPress, text, isSelected }) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}>
      <Text
        style={[styles.title, isSelected && styles.selectedTitle]}
        numberOfLines={1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  selectedTitle: {
    color: '#FFFFFF',
  },
});
