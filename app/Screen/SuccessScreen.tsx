import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const SuccessScreen = ({ navigation }: { navigation: any }) => {
    const bounceAnim = useRef(new Animated.Value(0)).current; 
    useEffect(() => {
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 3,
          tension: 70,
          useNativeDriver: true, // Use native driver for better performance
        }).start();
      }, []);
    
  const handleAdditionalButtonPress = () => {
    // Implement functionality for the additional button here
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity >
      <Animated.Image
          source={require('../../assets/images/paymentsuccess.png')}
          style={[styles.paymentLogo, { transform: [{ scale: bounceAnim }] }]} // Applying bounce animation
        />
      </TouchableOpacity>
      <Text style={styles.messageText}>Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn sớm.</Text>
      <TouchableOpacity style={styles.additionalButton} onPress={handleAdditionalButtonPress}>
          <Text style={styles.additionalButtonText}>Đến trang chủ</Text>
        </TouchableOpacity>
    
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  paymentLogo: {
    width: 300,
    height: 300,
  },
  additionalButton: {
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  additionalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
