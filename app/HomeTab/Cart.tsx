import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import { v4 as uuidv4 } from "uuid";
import { ADDCART, GET_IMG, REMOVEFROMCART } from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const addToCart = async (newProduct) => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    console.log("Current cart:", cartItems);

    cartItems.push(newProduct);

    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error adding to cart", error);
  }
};

const Cart = ({ navigation,route }: { navigation: any,route:any }) => {
  const [coffeeData, setCoffeeData] = useState([]);


  
  useEffect(() => {
    if (route.params && route.params.coffee) {
      console.log("Received coffee:", route.params.coffee);
      handleAddCoffee(route.params.coffee);
    } else {
      console.log("No coffee data in route params");
    }
  }, [route.params]);


  const handleAddCoffee = async (coffee) => {
    if (!coffee) {
      console.error("Product not found");
      return;
    }
    try {
      const cartId = await AsyncStorage.getItem('cartId');
      // const cartId = await AsyncStorage.getItem('cartId');
console.log("Cart ID retrieved:", cartId); // Log it to see if it's being stored/retrieved correctly

      // if (!cartId) {
      //   console.error("Cart ID not found in AsyncStorage");
      //   return;
      // }
      const newCoffee = {
        ...coffee,
        key: uuidv4(),
        total: coffee.specialPrice * (coffee.quantity || 1),
        opacity: new Animated.Value(1), // Create a new Animated.Value for opacity
      };
    


  
      const response = await ADDCART(cartId, newCoffee.productId, newCoffee.quantity);
      if (response) {
        console.log("Product added to database cart successfully");

        await addToCart(newCoffee);
       
      
      setCoffeeData((prevData) => [...prevData, newCoffee]);
    }
  }
  catch (error) {
    console.error("Error adding product to cart:", error);
  }
  };


  const handleDeleteProduct = async (productId) => {
    try {
      const cartId = await AsyncStorage.getItem('cartId');
      if (cartId) {
        console.log("Cart ID:", cartId);
        await REMOVEFROMCART(cartId, productId); // Remove from database
      }
      
      // Update local cart data
      setCoffeeData((prevData) => prevData.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error deleting product from the cart:", error);
    }
  };
  
  const totalSum = coffeeData.reduce((sum, item) => sum + item.total, 0);

  const handleSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
  
    // Find item by key
    const itemIndex = coffeeData.findIndex((item) => item.key === key);
    if (itemIndex < 0) return;
  
    const item = coffeeData[itemIndex];
  
    // Calculate opacity based on swipe value
    const opacityValue = value < -100 ? 0 : 1 + value / 200;
  
    // Set opacity
    Animated.timing(item.opacity, {
      toValue: opacityValue,
      duration: 60,
      useNativeDriver: true,
    }).start(() => {
      // Delete item if swipe is far enough
      if (value < -200) {
        handleDeleteProduct(item.productId); // Use productId instead of key
      }
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>

      <SwipeListView
        data={coffeeData}
        renderItem={(data) => (
          <Animated.View
            style={[styles.orderItem, { opacity: data.item.opacity }]}
          >
            <Image
              style={styles.image}
              source={{ uri: GET_IMG("products/image", data.item.image) }}
            />
            <View style={styles.orderDetails}>
              <Text style={styles.name}>{data.item.productName}</Text>
              <View style={styles.priceAndButton}>
              {data.item.price !== data.item.specialPrice && (
    <Text style={styles.price}>{data.item.price.toFixed(0)} đ</Text>
  )}
              <Text style={styles.priceSale}>{data.item.specialPrice.toFixed(0)} đ</Text>
              </View>
            
              {/* <Text style={styles.description}>{data.item.description}</Text> */}
              <Text style={styles.quantity}>x{data.item.quantity}</Text>
              <Text style={styles.total}>{data.item.total} đ</Text>
            </View>
          </Animated.View>
        )}
        renderHiddenItem={(data) => (
          <View style={styles.hiddenItem}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleDeleteProduct(data.item.productId)}
            >
              <AntDesign name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        onSwipeValueChange={handleSwipeValueChange}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng giá: </Text>
        <Text style={styles.totalPrice}>{totalSum} đ</Text>
      </View>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
          setCoffeeData([]); // Clear the cart
          navigation.navigate("Payment", { coffeeData: coffeeData }); // Navigate to the Payment screen
        }}
      >
        <Text style={styles.buyButtonText}>
          <AntDesign name="shoppingcart" size={24} color="#fff" /> Thanh toán
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  priceAndButton: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    // alignItems: 'start',
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  orderDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#989393",
    marginLeft:-70,
    textDecorationLine:'line-through',
  },
  priceSale: {
    fontSize: 16,
    color: "#333",
    marginLeft:-70
  },
  total: {
    fontSize: 17,
    color: "#333",
    fontWeight:'bold'

  },
  description: {
    fontSize: 14,
    color: "#999",
  },
  quantity: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  hiddenItem: {
    alignItems: "flex-end",
    backgroundColor: "#ff5e5e",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ff5e5e",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    color: "#333",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#2c3e50",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
