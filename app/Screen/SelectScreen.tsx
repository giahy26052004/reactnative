import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SelectScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style = {styles.container}>
        <TouchableOpacity  style={styles.backButton} onPress={()=>navigation.navigate('Welcome')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style = {styles.textName}>Lựa chọn </Text>
      <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('SignIn')}>
                <Text style={styles.btnText}>Đăng nhập</Text>
            </TouchableOpacity>
            
            <Text style = {styles.textOr} >hoặc</Text>
            
            <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('SignUp')}>
                <Text style={styles.btnText}>Đăng ký</Text>
            </TouchableOpacity>
      {/* <View style={styles.signInButtonContainer} >
        <TouchableOpacity style={styles.signInButton} onPress={()=>navigation.navigate('Select')}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

export default SelectScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        padding:15
       
    },
    backButton:{
    
            marginTop: 30,
            marginBottom: 20,
       
    }, button: {
      marginTop:20,
      backgroundColor: '#000', // Màu nền của nút
      padding: 20, // Padding cho nút
      borderRadius: 25, // Bo góc cho nút
      alignItems: 'center', // Căn giữa nội dung bên trong nút
      marginVertical: 5, // Khoảng cách giữa các nút
  },
  btnText: {
      color: '#FFFFFF', // Màu chữ trên nút
      fontSize: 16, // Kích thước chữ
  },
    textName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
       marginTop:50,
       textAlign:'center'
    },
    btnLog:{
        width: 100,
        backgroundColor: '#000'
    },
    textOr :{
       marginTop:30,
       marginBottom: 10,
       fontSize: 18,
      textAlign:'center'
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