import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AlertBox = ({message}) => {
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/images/logout.png')} />
      <Text>AlertBox</Text>
    </View>
  )
}

export default AlertBox

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F9E7E8',
        alignSelf:'center',
        width:'90%',
        padding:15,

    }
})