import { View, Text, Image, StyleSheet } from 'react-native';

export default function MenuItem({ item }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={styles.description}
          ellipsizeMode='tail'
          numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
    flexDirection: 'row', // Add this to align the image and text side by side
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    width: '90%',
    fontSize: 14,
    color: '#495E57',
    ellipsizeMode: 'tail',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
  },
});
