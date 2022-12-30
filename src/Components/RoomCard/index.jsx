import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../../Utils/Color'
import { IMAGES } from '../../assets/images'

const RoomCard = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.body} onPress={onPress}>
        <View style={styles.header}>
            <View style={styles.imageView}>
                <Image source={IMAGES.Light_Plug} style={styles.image}/>
            </View>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                value={true}
      />
        </View>
    </TouchableOpacity>
  )
}

export default RoomCard

const styles = StyleSheet.create({
    body:{
        width:'50%',
        backgroundColor:Color.WHITE,
        borderRadius:8,
        alignSelf:'center',
        // marginHorizontal:8
        // marginHorizontal:8,
        padding:12,

    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    imageView:{
        backgroundColor:Color.LIGHT_BLUE,
        padding:12,
        alignItems:'center',
        borderRadius:30
    },
    image:{
        height:30,
        width:30
    }
})