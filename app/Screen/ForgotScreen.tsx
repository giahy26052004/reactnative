import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';

const ForgotScreen = ({ navigation }: { navigation: any }) => {
  

  return (
    <View style={styles.container}>

      <TouchableOpacity  style={styles.backButton} onPress={()=>navigation.navigate('SignUp')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>


      <View style={styles.titleSection}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter email address here</Text>
      </View>


      <View style={styles.inputContainer}>
 
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

    
       

       
      </View>

   
      <View style={styles.signInButtonContainer} >
        <TouchableOpacity style={styles.signInButton} onPress={()=>navigation.navigate('Home')}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>


      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>
          New member?    
           <Button color={'#324A59'} 
      title="SignUp"
      onPress={() => navigation.navigate('SignUp')}
    />
        </Text>
      </View> */}
    </View>
    
  );
};

export default ForgotScreen;

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
    marginTop:50,
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
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#d3d3d3',
    borderLeftColor:'#ccc'
  },
  forgotPassword: {
    alignSelf: 'center',
    textDecorationLine:'underline',
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
    marginTop:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'flex-end',
   
    marginTop: 50,
  },
  footerText: {
    color: 'gray',
    marginRight:30,
  },
  signUpText: {
    color: '#324A59',
    fontWeight: '500',
  },
});
