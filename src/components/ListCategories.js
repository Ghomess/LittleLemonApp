import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';

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
    backgroundColor: colors.secondary3,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: colors.primary1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary1,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  selectedTitle: {
    color: colors.secondary3,
  },
});
