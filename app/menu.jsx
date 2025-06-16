import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { db } from "@/backend/firebaseConfig.js";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import menuStyles from "@/components/menuStyles.jsx";

export default function MenuScreen() {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantAndMenu = async () => {
      if (!id) {
        setError("No restaurant ID provided.");
        setLoading(false);
        return;
      }
      try {
        const restaurantDocRef = doc(db, 'restaurants', id);
        const restaurantDocSnap = await getDoc(restaurantDocRef);

        if (restaurantDocSnap.exists()) {
          setRestaurant({ id: restaurantDocSnap.id, ...restaurantDocSnap.data() });

          const menuCollectionRef = collection(db, 'restaurants', id, 'menu');
          const menuSnapshot = await getDocs(menuCollectionRef);
          const items = menuSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMenuItems(items);
        } else {
          setError("Restaurant not found.");
        }
      } catch (err) {
        console.error("Error fetching restaurant or menu:", err);
        setError("Failed to load restaurant or menu data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantAndMenu();
  }, [id]);

  if (loading) {
    return (
      <View style={menuStyles.container}>
        <Text>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={menuStyles.container}>
        <Text style={menuStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={menuStyles.container}>
        <Text>Restaurant not found.</Text>
      </View>
    );
  }

  const renderMenuItem = ({ item }) => (
    <View style={menuStyles.menuItemCard}>
      <Text style={menuStyles.menuItemName}>{item.itemName}</Text>
      <Text style={menuStyles.menuItemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={menuStyles.container}>
      <Text style={menuStyles.restaurantName}>{restaurant.name}</Text>
      <Text style={menuStyles.cuisineText}>{restaurant.cuisine}</Text>
      <Text style={menuStyles.menuHeader}>Menu</Text>
      {menuItems.length > 0 ? (
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={menuStyles.menuListContainer}
        />
      ) : (
        <Text>No menu items available.</Text>
      )}
    </View>
  );
}