// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

import OnboardingScreen from './src/screens/Onboarding';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import SplashScreen from './src/screens/SplashScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const checkOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('onboardingComplete');
      setIsOnboardingComplete(status !== null);
    } catch (e) {
      console.error('Failed to load onboarding status');
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      setIsOnboardingComplete(true);
    } catch (e) {
      console.error('Failed to save onboarding status');
    }
  };

  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
      await checkOnboardingStatus();
      setIsLoading(false);
    };
    init();
  }, []);

  const initializeDatabase = async () => {
    const database = await SQLite.openDatabaseAsync('little_lemon.db');
    await createTable(database);
    setDb(database);
  };

  const createTable = async (database) => {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        image TEXT,
        category TEXT
      );
    `);
  };

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboardingComplete ? 'Home' : 'Onboarding'}>
        <Stack.Screen
          name='Onboarding'
          options={{ headerShown: false }}
          children={(props) => (
            <OnboardingScreen
              {...props}
              completeOnboarding={completeOnboarding}
            />
          )}
        />
        <Stack.Screen
          name='Home'
          options={{ headerShown: false }}
          children={(props) => (
            <Home
              {...props}
              db={db}
            />
          )}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{
            headerTitle: 'Profile',
            headerStyle: { backgroundColor: '#2a3c44' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
