import { View, Text, FlatList, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import menuStyles from "@/components/menuStyles.jsx";

export default function MenuScreen() {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
  const fetchMenu = async () => {
    if (!id) {
      setError("No restaurant ID provided.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurant/${id}`);
      const data = await response.json();

      if (response.ok) {
        setRestaurant(data.restaurant);
        setMenuItems(data.menu);
      } else {
        setError(data.error || "Failed to fetch restaurant.");
      }
    } catch (err) {
      console.error("Error fetching restaurant or menu:", err);
      setError("Failed to load restaurant or menu data.");
    } finally {
      setLoading(false);
    }
  };

  fetchMenu();
}, [id]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevItems];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === itemId);
      if (existingItemIndex > -1) {
        const newCart = [...prevItems];
        if (newCart[existingItemIndex].quantity > 1) {
          newCart[existingItemIndex].quantity -= 1;
        } else {
          newCart.splice(existingItemIndex, 1);
        }
        return newCart;
      }
      return prevItems;
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

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
    <TouchableOpacity onPress={() => addToCart(item)}>
      <View style={menuStyles.menuItemCard}>
        <Text style={menuStyles.menuItemName}>{item.itemName}</Text>
        <Text style={menuStyles.menuItemPrice}>${item.price ? item.price.toFixed(2) : 'N/A'}</Text>
      </View>
    </TouchableOpacity>
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

      <TouchableOpacity
        style={menuStyles.cartButton}
        onPress={() => setIsCartVisible(true)}
      >
        <Text style={menuStyles.cartButtonText}>View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartVisible}
        onRequestClose={() => setIsCartVisible(false)}
      >
        <View style={menuStyles.modalContainer}>
          <View style={menuStyles.modalContent}>
            <Text style={menuStyles.modalTitle}>Your Cart</Text>
            {cartItems.length > 0 ? (
              <ScrollView style={menuStyles.cartList}>
                {cartItems.map((item) => (
                  <View key={item.id} style={menuStyles.cartItem}>
                    <Text style={menuStyles.cartItemName}>{item.itemName} (x{item.quantity})</Text>
                    <Text style={menuStyles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <View style={menuStyles.cartItemActions}>
                      <Button color='#28a745' title="-" onPress={() => removeFromCart(item.id)} />
                      <Button color='#28a745' title="+" onPress={() => addToCart(item)} />
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>Your cart is empty.</Text>
            )}
            <Text style={menuStyles.cartTotal}>Total: ${calculateTotalPrice().toFixed(2)}</Text>
            <Button color='#28a745' title="Close Cart" onPress={() => setIsCartVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}