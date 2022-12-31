import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../utils/Color'
import moment from 'moment'

const DeviceStatusHistory = ({history}) => {
    const renderItem = ({item}) =>{
        let color = item.consumption >100 ? 'red':item.consumption==100?'orange':'green'
        return (
            <View style={styles.container}>
                <Text style={styles.width}>{moment(item.switch_on_time).format("DD MMM hh:mm")}</Text>
                
                <Text style={[styles.width,{color:item.switch_off_time ? "black" : "red"}]}>{item.switch_off_time ? moment(item.switch_off_time).format("DD MMM hh:mm") : "Still On"}</Text>
                <View style={styles.container}>
                    <View style={[styles.mark,{backgroundColor:color}]}></View>
                    <Text>{(item.consumptionWattPerHour/1000).toFixed(2)}kWh</Text>
                </View>
                <View style={[styles.container, {marginRight:32}]}>
                    <View style={[styles.mark,{backgroundColor:color}]}></View>
                    <Text>{(item.cost).toFixed(2)}₹</Text>
                </View>
            </View>
        )
    }
  return (
    <View style={styles.body}>
        <Text style={styles.header}>History</Text>
       {history ? <FlatList
        data = {history}
         ListHeaderComponent={()=>(
            <View style={styles.container}>
            <Text style={[styles.width,{fontWeight:'bold'}]}>{"On Time"}</Text> 
            <Text style={[styles.width,{fontWeight:'bold'}]}>{'Off Time'}</Text>
            <View style={styles.container}>
                <Text style={{fontWeight:'bold'}}>Unit</Text>
            </View>
            <View style={styles.container}>
                <Text style={{fontWeight:'bold'}}>Cost</Text>
            </View>
        </View>
        )}
        renderItem={renderItem}
        header
        keyExtractor={item=>item.id}
        />:
        <Text style={styles.textColor}>History not found</Text>}
    </View>
  )
}

export default DeviceStatusHistory

const styles = StyleSheet.create({
    body:{
        paddingVertical:15,
        marginHorizontal:20,
        justifyContent:'center'
    },
    header:{
        fontSize:18,
        paddingBottom:20,
        textAlign:'center',
        color:Color.BLACK
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:3,
        width:Dimensions.get('window').width/4
    },
   mark:{
    padding:3,
    borderRadius:20,
    alignSelf:'center',
    marginRight:5
   },
   width:{width:Dimensions.get('window').width/4}
})