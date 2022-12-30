import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState} from 'react';
import DateTimePicker from '../../../components/DateTimePicker';
import Color from '../../../utils/Color';
import APIs from '../../../api/APIs'

const Scheduler = ({deviceInfo, cbSuccess}) => {
    const [schedularTime, setSchedularTime] = useState({startTime:new Date(),endTime:new Date()});
    const [errorMessage, setErrorMessage] = useState('')
    console.log('schedularTime: ', schedularTime);
    const handleSchedulerTime = ()=>{
        let {startTime,endTime} = schedularTime;
        if((startTime).toString()===(endTime).toString()){
            setErrorMessage('Please set proper time interval');
        }else{
            setErrorMessage('')
            let params =  {
                "serial_number":deviceInfo.serial_number,
                "pinId":deviceInfo.pinId,
                "scheduleStartDateTime":startTime,
                "scheduleStopDateTime":endTime
            }
            // api call
            APIs.scheduleTime(params).then(res=>{
              console.log('res: ', res);
            cbSuccess()

            }).catch((error)=>{
              console.log('error', error)
            setErrorMessage(error.message)

            })
        }
    }
  return (
    <View style={{marginVertical: 20}}>
      <Text>Set {deviceInfo.name} on time</Text>

      <DateTimePicker date={schedularTime.startTime} onChange={(time)=>{console.log('startTime time', time);setSchedularTime({startTime:time,endTime:schedularTime.endTime})}} />
      <Text>Set {deviceInfo.name} off time</Text>

      <DateTimePicker date={schedularTime.endTime} onChange={(time)=>{console.log('endTime ', time );setSchedularTime({startTime:schedularTime.startTime,endTime:time})}} />
      {errorMessage?<Text style={{color:Color.ERROR}}>{errorMessage}</Text>:null}
      <TouchableOpacity
          onPress={handleSchedulerTime}
          style={styles.button}>
          <Text style={[styles.text, {color: Color.WHITE}]}>
            Save
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Scheduler;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.DARK_BLUE,
    marginHorizontal: 30,
    alignSelf: 'flex-start',
    padding: 15,
    borderRadius: 8,
  },
});
