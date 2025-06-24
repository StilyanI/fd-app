import homeStyles from "@/components/homeStyles.jsx";
import styles from "@/components/styles.jsx";
import { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from 'expo-router';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants`);
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants from API:', error);
    } finally {
      setLoading(false)
    }
  };

  fetchRestaurants();
}, []);


  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={homeStyles.restaurantCard} onPress={() => router.push(`/menu?id=${item.id}`)}>
      
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading menu...</Text>
      </View>
    );
  }

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