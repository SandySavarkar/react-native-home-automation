import React, { useState } from 'react'
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker'
import Color from '../../utils/Color';

const DateTimePicker = ({onChange,date}) => {
  return (
    <View style={{alignSelf:'center',marginVertical:20}}>
       <DatePicker textColor={Color.BLACK} date={date} onDateChange={onChange} minimumDate={new Date()}/> 
    </View>
  )
}
export default DateTimePicker;