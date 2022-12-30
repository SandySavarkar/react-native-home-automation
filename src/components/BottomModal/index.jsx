import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../../utils/Color'
import { Image } from 'react-native'

const BottomModal = ({header,isOpen,handleOnClose,children}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen} onRequestClose={handleOnClose}>
        <View style={styles.container}>
        <View style={styles.mainContainer}>
        <View style={styles.header}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{header}</Text>
            <TouchableOpacity onPress={handleOnClose}>
            <Image source={require('../../assets/images/logout.png')} style={{height:20,width:20}}/>
            </TouchableOpacity>
        </View>
        {children}
        </View>
        </View>
     </Modal>
  )
}

export default BottomModal

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    mainContainer: {
        paddingHorizontal:20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        backgroundColor: Color.WHITE_SMOKE
    },
})