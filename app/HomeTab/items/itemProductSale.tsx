
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ItemProductSale = ({ imageSource, textContent, textPrice, textPriceSale, textDescription, navigation }: any) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageSource }} // Sử dụng imageSource với dạng uri từ API
        style={styles.coffeeImage}
      />
      <Text style={styles.coffeeName}>{textContent}</Text>
      <Text style={styles.coffeeTitle}>{textDescription}</Text>
      <View style={styles.priceAndButton}>
        <Text style={styles.price}>{textPrice}đ</Text>
        
          <Text style={styles.priceSale}>{textPriceSale}đ</Text>
        
        
      </View>
      <TouchableOpacity style={styles.addButton}>
       Xem chi tiết
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180, 
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 15, 
    height: 290,
marginLeft:10,
   
  },
  coffeeImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coffeeTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#a49292',
    marginBottom: 10,
    textDecorationLine: 'line-through',
  },
  priceSale: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  priceAndButton: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    // alignItems: 'start',
  },
  addButton: {
    backgroundColor: '#8B4513',
    width: 155,        
    height: 40,       
    borderRadius: 14, 
    alignItems: 'center',
    justifyContent: 'center', 
    color:"#fff"
  },
});

export default ItemProductSale;
