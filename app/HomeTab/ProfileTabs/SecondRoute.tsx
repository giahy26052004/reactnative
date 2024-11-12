import { GET_IMG, GETALL_ORDER } from '@/app/api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';

const SecondRoute = ({ navigation }: { navigation: any }) => {
  const [orders, setOrders] = useState([]);  // State to store orders
  const [loading, setLoading] = useState(true);  // State for loading
  const [emailId, setEmailId] = useState<string>('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);  // State to track expanded orderId

  useEffect(() => {
    const fetchEmailId = async () => {
      try {
        const email = await AsyncStorage.getItem('email'); // Assuming email is saved in AsyncStorage
        if (email) {
          setEmailId(email); // Store emailId in state
        }
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };

    fetchEmailId();  // Fetch emailId from AsyncStorage
  }, []);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await GETALL_ORDER(emailId);
        setOrders(fetchedOrders);  // Set the fetched orders to state
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchOrders();  // Call the function to fetch orders
  }, [emailId]);

  if (loading) {
    return <Text>Loading...</Text>;  // Show loading text while fetching
  }

  const toggleDetails = (orderId: number) => {
    setExpandedOrder(prev => (prev === orderId ? null : orderId));  // Toggle the visibility of order items
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}  // Pass the orders data
        keyExtractor={(item) => item.orderId.toString()}  // Use orderId as unique key
        renderItem={({ item }) => {
          const showDetails = expandedOrder === item.orderId;  // Determine if the details for this order should be shown

          return (
            <View style={styles.orderItem}>
              <View style={styles.orderDetails}>
                <Text style={styles.name}>#{item.orderId}</Text>
                <Text style={styles.name1}>Email: {item.email}</Text>
                <Text style={styles.name1}>Ngày đặt: {item.orderDate}</Text>
                <TouchableHighlight onPress={() => toggleDetails(item.orderId)}>
                  <Text style={styles.viewDetailsButton}>{showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}</Text>
                </TouchableHighlight>
              </View>

              {/* Conditionally render the order details (orderItems) */}
              {showDetails && (
                <FlatList
                  data={item.orderItems}  // Use the orderItems array
                  keyExtractor={(orderItem) => orderItem.orderItemId.toString()}  // Use orderItemId as unique key
                  renderItem={({ item: orderItem }) => (
                    <View style={styles.orderDetails}>
       <Text style={styles.name2}>Sản phẩm:{orderItem.product.productName}</Text>
                      {/* <Text style={styles.description}>{orderItem.product.description}</Text> */}
                      <Text style={styles.quantity}>Số lượng: {orderItem.quantity}</Text>
                      <Text style={styles.price}>Giá: {orderItem.orderedProductPrice}</Text>
                      <Text style={styles.price}>Giảm giá: {orderItem.discount}%</Text>
                      {/* <Text style={styles.price}>Tổng cộng: {orderItem.quantity * orderItem.orderedProductPrice}</Text> */}
                    </View>
                    
                  )}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  orderItem: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  orderDetails: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name1: {
    fontSize: 15,
  },
  name2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#999',
  },
  quantity: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  viewDetailsButton: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  },
});

export default SecondRoute;
