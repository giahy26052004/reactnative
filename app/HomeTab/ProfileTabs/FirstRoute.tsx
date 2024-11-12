import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstRoute = () => {
 const navigation = useNavigation();
 const handleLogout = async () => {
  try {
    // Clear AsyncStorage
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('cartId');
    await AsyncStorage.removeItem('userInfo');

    // Navigate to Login screen
    navigation.navigate("Select");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  return (
    <View style={styles.container}>

    <View style={styles.inputContainer}>

 <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => navigation.navigate('Acount')}
        >
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={styles.input}>Tài khoản</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => navigation.navigate('ChangePass')}
        >
          <Entypo name="key" size={24} color="black" />
          <Text style={styles.input}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>

<TouchableOpacity
          style={styles.inputWrapper}
          onPress={handleLogout}
        >
         <MaterialIcons name="keyboard-tab" size={24} color="black" />
          <Text style={styles.input}>Đăng xuất</Text>
        </TouchableOpacity>
</View>
</View>

 
  
  )
}

export default FirstRoute

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    padding:15
 
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

