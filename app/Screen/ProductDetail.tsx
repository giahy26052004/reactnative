  import React, { useEffect, useState } from 'react';
  import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import { FontAwesome, FontAwesome5, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
  import Feather from '@expo/vector-icons/Feather';


  import Swiper from 'react-native-swiper';
import { GET_IMG } from '../api/apiService';
import { TouchableHighlight } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const ProductDetail = ({ route,navigation }: { navigation: any,route:any }) => {
    const {coffee} = route.params;
    const [total,totalPrice] =useState(coffee.specialPrice);
    const [quantity,setQuantity]= useState(1);
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const loadCart = async () => {
          try {
              const storedCart = await AsyncStorage.getItem('cart')
              if (storedCart) {
                  setProducts(JSON.parse(storedCart))
              }
          } catch (error) {
              console.error('Error loading cart data from AsyncStorage', error)
          }
      }
      loadCart()
  }, [])

  // Save cart data to AsyncStorage whenever products array changes
  useEffect(() => {
      const saveCart = async () => {
          try {
              await AsyncStorage.setItem('cart', JSON.stringify(products))
          } catch (error) {
              console.error('Error saving cart data to AsyncStorage', error)
          }
      }
      saveCart()
  }, [products])

    return (
    <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={false}>
    {/* Top Section */}
    <View style={styles.header}>
    <TouchableOpacity  onPress={()=>navigation.navigate('Home')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.greeting}>Cộng Cà Phê</Text>
      <Image style={styles.img} source={require('../../assets/images/logo111.png')} />
    </View>

    {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Feather name="search" style={styles.searchIcon} size={24} color="black" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Coffee..."
          placeholderTextColor="#8d8b8b"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome5 name="filter" size={20} color="#8B4513" />
        </TouchableOpacity>
      </View>
    <View style = {styles.imgdetail}>
      <Image style = {styles.imgdetail} source={{ uri:GET_IMG("products/image",coffee.image) }}/>

    </View>
  <View style = {styles.txtimg}>

  <Text style={styles.greeting1}>{coffee.title}</Text>

  </View>
  <View style = {styles.maindetail}>
  <Text style={styles.greeting2}>{coffee.productName}</Text>  
  <View style={styles.priceAndButton}>

  {coffee.price && coffee.specialPrice && coffee.price !== coffee.specialPrice ? (
    <Text style={styles.price}>{coffee.price} đ</Text> // Hiển thị giá gốc
  ) : null}

  <Text style={styles.priceSale}>{coffee.specialPrice}đ</Text>
  </View>
 


  <View>
  <InputSpinner 
    max={10}
    min={1}
    step={1}
    skin={"round"}
    color={"#fff"}
    value={quantity}  // Đảm bảo rằng giá trị quantity được duy trì
    height={40}
    width={100}
    background={"#fff"}
    showBorder={false}
    style={styles.quantity}
    onChange={(num) => {
     // const priceToUse = coffee.specialPrice && coffee.specialPrice > 0 ? coffee.specialPrice : coffee.specialPrice; // Sử dụng specialPrice nếu có, nếu không dùng price
      const total = num * coffee.specialPrice;  // Tính tổng dựa trên specialPrice hoặc price
      coffee.total = total;  // Cập nhật total của coffee
      totalPrice(total);  // Cập nhật tổng giá
      setQuantity(num);  // Cập nhật quantity
    }}
  />



  <Text style={styles.greeting3}>Mô tả</Text>  
  <p style={styles.p}>{coffee.description}</p>
  <TouchableOpacity 
  style={styles.button} 
  onPress={() => {
    const updatedCoffee = { ...coffee, quantity: quantity }; // Add quantity or any other relevant data
    navigation.navigate('Cart', { coffee: updatedCoffee });
  }}
>
  <Text style={styles.btnText}>THÊM VÀO GIỎ | {total} đ</Text>
</TouchableOpacity>

<TouchableHighlight
  style={{ marginBottom: 20, borderRadius: 15 }}
  activeOpacity={0.0}
  underlayColor="#fff"
  onPress={() => {
    const updatedCoffee = { ...coffee, quantity: quantity }; // Update quantity or any necessary fields
    navigation.navigate('Pay', {
      coffee: updatedCoffee,
    });
  }}
>
  <Text style={styles.btnText}>Proceed to Payment</Text>
</TouchableHighlight>

  </View>
  </View>
  </ScrollView>
  );
  };


  export default ProductDetail;
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfafa',
        paddingTop: 40,
  
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,      marginTop: 20,
    },
    quantity:{
      marginLeft: 30,
      marginBottom: 10,
    },
    greeting: {
        fontSize: 18,
     marginRight:-160,
        color: '#333',
        fontWeight: 'bold',
        
        
    },
    img:{
      width:30,
      height:30,
    },
    priceAndButton: {
      flexDirection: 'row', 
      justifyContent: 'space-around',
      // alignItems: 'start',
    },
    greeting1: {
        fontSize: 22, // Increased font size for better visibility
        marginLeft: 10,
        color: '#e61515', // Change color to ensure it's visible
        fontWeight: 'bold',
    }, 
       greeting2: {
      fontSize: 22, // Increased font size for better visibility
      marginLeft: 30,
      marginTop: 20,
      marginBottom: 10,
      color: '#000', // Change color to ensure it's visible
      fontWeight: 'bold',
  }, greeting3: {
    fontSize: 22, // Increased font size for better visibility
    margin: 5,
    marginLeft: 30,
    
    color: '#000', // Change color to ensure it's visible
    fontWeight: 'bold',
},
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    mainScrollView: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#f1f1f1',
        paddingBottom: 20, // Added padding at the bottom to avoid content cutoff
    },
    txtimg: {
      position: 'absolute', // Thiết lập vị trí tuyệt đối cho văn bản
      top: 320, // Khoảng cách từ đầu container
      left: 10, // Khoảng cách từ bên trái container
      color: '#FFFFFF', // Màu chữ
      fontSize: 18, // Kích thước chữ
     
     
    },
    price:{
      fontSize: 17, // Increased font size for better visibility
   
      marginBottom: 20,
      
      color: '#c1bebe', // Change color to ensure it's visible
    
      textDecorationLine: 'line-through',
    },
    priceSale:{
      fontSize: 17, // Increased font size for better visibility
      
      marginBottom: 20,
      
      color: '#000', // Change color to ensure it's visible
      fontWeight: 'bold',
    
    },
    maindetail:{
      width: 390,
      position: 'absolute', // Thiết lập vị trí tuyệt đối cho văn bản
      top: 380, // Khoảng cách từ đầu container
    // Khoảng cách từ bên trái container
backgroundColor:'#fff',
      fontSize: 18, // Kích thước chữ
      borderTopLeftRadius:50,
      borderTopRightRadius:50, // Thêm góc trái và phải của hình tròn
      height:500
     
    },
    imgdetail: {
        width: '100%',
        height: 300, // Adjust height for better proportion
        resizeMode: 'cover',
        justifyContent: 'center',
        alignContent: 'center',
        
        marginBottom: 10, // Added margin to separate from text
    },

    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        backgroundColor: '#e0e0e0', // Lighter background for better contrast
        borderRadius: 25, // More rounded corners
        paddingHorizontal: 10, // Added padding for better touch target
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10, // Adjusted for better alignment
        marginBottom: 20,
    }, button: {
      margin:20,
      
      backgroundColor: '#8B4513', // Màu nền của nút
      padding: 20, // Padding cho nút
      borderRadius: 25, // Bo góc cho nút
      alignItems: 'center', // Căn giữa nội dung bên trong nút
      marginVertical: 5, // Khoảng cách giữa các nút
  },
  btnText: {
      color: '#FFFFFF', // Màu chữ trên nút
      fontSize: 16,
      fontWeight:'bold' // Kích thước chữ
  },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F2F2F2', // Light background for inactive buttons
        borderRadius: 25, // More rounded corners
        marginHorizontal: 5,
    },
    categoryButtonActive: {
        backgroundColor: '#8B4513', // Different background for active button
    },
    categoryIcon: {
        marginRight: 8, // Space between icon and text
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    categoryTextActive: {
        color: '#fff', // Active button text color
    },
    searchBar: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    searchIcon: {
        paddingHorizontal: 10, // Adjusted padding for better touch target
    },
    p:{
      margin:20,
    
      fontSize:20,
      color: '#000',
      // Added line height for better readability
    }
});

