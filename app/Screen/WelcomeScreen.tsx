import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 6000, // 3 seconds for a full rotation
        easing: Easing.linear, // Smooth continuous spinning
        useNativeDriver: true, // Enable native driver for better performance
      })
    ).start();
  }, [rotateAnim]);
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // A full 360-degree rotation
  });
  return (
    <View style = {styles.container}>
     <Image style = {styles.bg} source={require('../../assets/images/background.png')}/>
     <TouchableOpacity style={styles.vectorform} onPress={() => navigation.navigate('Select')}>
        <Animated.Image
          style={[styles.vector, { transform: [{ rotate }] }]} // Apply the rotation
          source={require('../../assets/images/Vector.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%', 
    display: 'flex',

  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'  // Transparent black background with 50% opacity
  },
  vectorform:{
    display: 'flex',
top:250,
    alignItems: 'center', 
  },
  vector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  signInButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  signInButton: {
    backgroundColor: '#8B4513', 
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop:350,
    marginRight:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})