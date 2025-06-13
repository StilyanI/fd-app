import homeStyles from "@/components/homeStyles.jsx";
import styles from "@/components/styles.jsx";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

//data for testing
const restaurants = [
  {
    id: 1,
    name: "McDonald's",
    cuisine: "Burgers",
    rating: 4.1
  },
  {
    id: 2,
    name: "Happy",
    cuisine: "Mixed",
    rating: 4.7
  }
];

export default function Home() {
  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={homeStyles.restaurantCard}>
      
      <View style={homeStyles.restaurantInfo}>
        <View style={homeStyles.restaurantHeader}>
          <Text style={homeStyles.restaurantName}>{item.name}</Text>
          <View style={homeStyles.ratingContainer}>
            <Text style={homeStyles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
        
        <Text style={homeStyles.cuisineText}>{item.cuisine}</Text>
      
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.listContainer}
        style = {{width: '100%'}}
      />
    </View>
  );
}