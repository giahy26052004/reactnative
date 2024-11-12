import React from 'react';
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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Favorite = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
    
      <TouchableOpacity  onPress={()=>navigation.navigate('SignIn')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

          <Image source={require('../../assets/images/Monica 1.png')} />
      
        
      </View>
      <Text style={styles.title}>Favorites</Text>
      {/* Select your coffee text */}
      <View style={styles.selectTextContainer}>
        <Text style={styles.selectText}>Select your coffee</Text>
      </View>

      {/* Coffee grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        
        <TouchableOpacity style={styles.gridItem}>
        <Image
          source={require('../../assets/images/mug.png')}
          style={styles.coffeeImage}
        />  
          <Text style={styles.coffeeName}>Americano</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
        <Image
          source={require('../../assets/images/capu.png')}
          style={styles.coffeeImage}
        />  
          <Text style={styles.coffeeName}>Cappuccino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
        <Image
          source={require('../../assets/images/latte.png')}
          style={styles.coffeeImage}
        />  
          <Text style={styles.coffeeName}>Latte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
        <Image
          source={require('../../assets/images/flag.png')}
          style={styles.coffeeImage}
        />  
          <Text style={styles.coffeeName}>Flat White</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
        <Image
          source={require('../../assets/images/raf.png')}
          style={styles.coffeeImage}
        />  
          <Text style={styles.coffeeName}>Raf</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
        <Image
          source={require('../../assets/images/exprea.png')}
          style={styles.coffeeImage}
        />  
          <Text style={styles.coffeeName}>Espresso</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal:10,
  marginBottom: 10,
    color: '#000',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectTextContainer: {
    backgroundColor: '#000',
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  selectText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:'#000'
  },
  gridItem: {
    backgroundColor: '#f2f2f2',
    width: '45%',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    height:200
  },
  coffeeImage: {
    width: 90,
    height: 80,
    marginTop:15,
    alignItems:'center',
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});