import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const DetailScreen = ({navigation}:{navigation:any}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#b88484' }}>
    <Text style = {{ fontSize:30}}>Details Screen</Text>
    <Button
      title="Go to SignIn"
      onPress={() => navigation.navigate('SignIn')}
    /><Button color={'fff'}
    title="Back Home"
    onPress={() => navigation.navigate('Home')}
  />
  </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})