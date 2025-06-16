import homeStyles from "@/components/homeStyles.jsx";
import styles from "@/components/styles.jsx";
import { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { db } from "@/backend/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { router } from 'expo-router';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    getRestaurants();
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