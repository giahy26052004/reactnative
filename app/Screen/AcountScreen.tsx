import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons, FontAwesome5, Fontisto, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AcountScreen = ({navigation}:{navigation:any}) => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
              setUserData(JSON.parse(userInfo));
            }
          } catch (error) {
            console.error("Error retrieving user info", error);
          }
        };
    
        fetchUserData();
      }, []);
    
  return (
    <View style={styles.container}>
              <TouchableOpacity  style={styles.backButton} onPress={()=>navigation.navigate('Profile')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <FontAwesome5 name="user" size={24} color="black" />
        <Text style={styles.input}>{userData.firstName}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <FontAwesome5 name="user" size={24} color="black" />
        <Text style={styles.input}>{userData.lastName}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Octicons name="device-mobile" size={24} color="black" />
        <Text style={styles.input}>{userData.mobileNumber}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Fontisto name="email" size={24} color="black" />
        <Text style={styles.input}>{userData.email}</Text>
      </View>
      {/* <View style={styles.inputWrapper}>
        <EvilIcons name="location" size={30} color="black" />
        <Text style={styles.input}>{userData.location}</Text>
      </View> */}
    </View>
  </View>
  )
}

export default AcountScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      padding:15,
  
   
    },
    backButton: {
      marginTop: 30,
      marginBottom: 20,
      
    },
    titleSection: {
      marginBottom: 30,
      paddingLeft:20
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: '#AAAAAA',
      marginBottom:30
    },
    inputContainer: {
  
      marginBottom: 30,
      paddingLeft:15,
      paddingRight:10
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 40,
      paddingBottom: 5,
      marginLeft: 10,
      margin: 10
    },
    input: {
      flex: 1,
      marginLeft: 20,
      fontSize: 16,
      color: '#000',
      borderLeftColor:'#ccc'
    },
    forgotPassword: {
      alignSelf: 'center',
      textDecorationLine:'none',
      color: '#324A59',
      fontWeight: '500',
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
      marginTop:50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      justifyContent: 'flex-end',
     
      marginTop: 50,
    },
    footerText: {
      color: 'gray',
    },
    signUpText: {
      color: '#324A59',
      fontWeight: '500',
    },
  });