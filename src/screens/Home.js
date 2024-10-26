import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import WelcomeViewHome from '../components/WelcomeViewHome';
import MenuItem from '../components/MenuItem';
import ListCategories from '../components/ListCategories';
import { colors } from '../utils/colors';

export default function Home({ db }) {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const listCategories = [
    { text: 'Starters' },
    { text: 'Mains' },
    { text: 'Desserts' },
    { text: 'Drinks' },
  ];

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  // Load menu data from SQLite with selected categories filter
  const loadDataFromDatabase = async () => {
    try {
      let query = 'SELECT * FROM menu';
      let params = [];
      const conditions = [];

      if (selectedCategories.length > 0) {
        const placeholders = selectedCategories.map(() => '?').join(', ');
        conditions.push(`category IN (${placeholders})`);
        params.push(...selectedCategories);
      }

      if (searchQuery.length > 0) {
        conditions.push(`name LIKE ?`);
        params.push(`%${searchQuery}%`);
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
      const allRows = await db.getAllAsync(query, params);

      if (allRows.length > 0) {
        setMenuData(allRows);
      }
      if (allRows.length === 0) {
        setMenuData([]);
      }

      const dbExists = await db.getAllAsync('SELECT * FROM menu');

      if (dbExists.length === 0) {
        fetchRemoteData();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading data from database: ', error);
      setLoading(false);
    }
  };

  // Fetch menu data from the remote server
  const fetchRemoteData = async () => {
    try {
      // Fetch new data from the remote server
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
      );
      const json = await response.json();
      const menuItems = json.menu;

      // Step 1: Fetch existing data from the database
      const existingItems = await db.getAllAsync('SELECT * FROM menu');

      // Step 2: Check if existing data matches the new data
      const existingIds = existingItems.map((item) => item.name); // Assuming name is unique; change if necessary
      const newItemsToInsert = menuItems.filter(
        (item) => !existingIds.includes(item.name),
      );

      // Step 3: Insert only new items if there are any
      if (newItemsToInsert.length > 0) {
        await Promise.all(
          newItemsToInsert.map((item) =>
            db.runAsync(
              'INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
              item.name,
              item.description,
              item.price,
              item.image,
              item.category,
            ),
          ),
        );

        // Optionally, you can update menuData with the newly added items
        setMenuData((prevMenuData) => [...prevMenuData, ...newItemsToInsert]);
      } else {
        console.log('No new items to insert; data is the same.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (db) {
      loadDataFromDatabase();
    }
  }, [db, selectedCategories, searchQuery]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <WelcomeViewHome
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <View style={styles.container}>
        <Text style={styles.header}>Order for Delivery!</Text>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={listCategories}
            renderItem={({ item }) => (
              <ListCategories
                text={item.text}
                onPress={() => toggleCategory(item.text.toLowerCase())}
                isSelected={selectedCategories.includes(
                  item.text.toLowerCase(),
                )}
              />
            )}
            keyExtractor={(item) => item.text}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 5 }} />
            )}
          />
        </View>

        {menuData.length > 0 ? (
          <FlatList
            data={menuData}
            renderItem={({ item }) => <MenuItem item={item} />}
            keyExtractor={(item) =>
              item?.id?.toString() || Math.random().toString()
            }
            style={{ height: 'auto' }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  padding: 1,
                  width: '100%',
                  backgroundColor: colors.secondary3,
                }}
              />
            )}
          />
        ) : (
          <View>
            <Text style={{ textAlign: 'center' }}>
              Making new recipes with Lemon to add to the Little Lemon
              Restaurant
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary1,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
});
