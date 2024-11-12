import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import apiPayPal from "../api/apiPayPal";
import { ADD_ORDER, GET_IMG } from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
const PaymentScreen = ({ navigation,route }: { navigation: any,route:any }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const { coffeeData } = route.params;  // Lấy dữ liệu từ route.params
  const [paymentMethod, setPaymentMethod] = useState('PAYPAL');
  const totalSum = coffeeData.reduce((sum, item) => sum + item.total, 0);

  // This function handles PayPal payment flow

 

  const handlePayNow = async () => {
    try {
      const cartId = await AsyncStorage.getItem('cartId');
      const emailId = await AsyncStorage.getItem('email');
      if (!cartId) {
          console.error("Cart ID not found in AsyncStorage");
          return;
      } 
            const response = await ADD_ORDER(emailId, cartId, paymentMethod);
          
      if (response) {
          console.log("Add order successfully");
          setMessage("Thank you for your order! We will contact you soon.");
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000); // Adjust the delay time as needed (2000 ms = 2 seconds)
      }
      navigation.navigate("Success");
      await AsyncStorage.setItem("cart", JSON.stringify([]));

  } catch (error) {
      console.error("Error clearing cart: ", error);
  }
    // Simulate successful payment and update UI accordingly
   
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Trang thanh toán</Text>

    
      
      <View style={styles.userInfo}>
  {coffeeData.map((item) => (
   
    <View key={item.key} style={styles.userDetails}>
      <Image
        source={{ uri: GET_IMG("products/image", item.image) }}  // Lấy ảnh từ API
        style={styles.productImage}  // Áp dụng kiểu cho ảnh
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>{item.specialPrice} đ</Text>
        <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
      
        <Text style={styles.productTotal}>Tổng:  {item.specialPrice * item.quantity}đ</Text> {/* Hiển thị tổng giá */}
      </View>
    </View>
  ))}




      </View>
   

     
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng tiền</Text>
        <Text style={styles.totalPrice}>{totalSum} đ</Text>
      </View>

      <TouchableOpacity
        style={styles.payButton}
      onPress={handlePayNow}
      >
        <Text style={styles.payButtonText}>
          <AntDesign name="creditcard" size={24} color="#fff" /> Thanh toán ngay
        </Text>
      </TouchableOpacity>

      {/* Show success message */}
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
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
    marginTop: 40,
    marginLeft: 20,
  },
  userInfo: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    textAlign: "right",
  },
  productQuantity: {
    fontSize: 14,
    color: "#555",
    marginTop: -15,
  },
  productTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 5,
  },
 

  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userAddress: {
    fontSize: 14,
    color: "#999",
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginLeft: 10,
    backgroundColor: "#F7F8FB",
    borderRadius: 10,
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 10,
    backgroundColor: "#2c3e50",
  },
  label: {
    fontSize: 16,
  },
  paymentLogo: {
    width: 80,
    height: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    color: "#333",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#2c3e50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  messageContainer: {
    padding: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    color: "#2c3e50",
    textAlign: "center",
  },
});

export default PaymentScreen;
