import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../utils/colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Little Lemon</Text>
      <ActivityIndicator
        size='large'
        color={colors.secondary4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary3,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SplashScreen;
