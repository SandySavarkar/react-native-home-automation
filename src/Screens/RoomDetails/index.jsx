import {
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    SafeAreaView,
    ScrollView
  } from 'react-native';
  import React, {useMemo, useState, useEffect, useContext, useRef} from 'react';
  import DeviceListing from '../../components/DeviceListing';
  import Color from '../../utils/Color';
  import DeviceStatusHistory from '../../components/DeviceStatusHistory';
  import {SocketContext} from '../../contexts/Socket';
  import BottomModal from '../../components/BottomModal';
  import Scheduler from './Components/Scheduler';
import { useDispatch, useSelector } from 'react-redux';
import APIs from '../../api/APIs';
import { updateHistory, updatePinsHistoryData } from '../../redux/reducers/historySlice';
import { groupByKey } from '../../utils/helpers';
import {UNIT_PRICE} from '../../utils/constants';

import moment from 'moment'
  
  export const LAPM_PINS = [
    {
      pinId: 5,
      pinName: 'D1',
      name: 'Fan',
      limit: 5,
      isScheduled: true,
    },
  
    {
      pinId: 14,
      pinName: 'D5',
      name: 'AC',
    },
  
    {
      pinId: 16,
      pinName: 'D0',
      name: 'Light',
    },
  ];

  var globlePinArray = [];
  
  export const RoomDetails = ({route}) => {
    const {details} = route?.params;
    const dispatch = useDispatch();
    const [activePinId, setActivePinId] = useState(5);
    const [pinsArray, setPinArray] = useState(details?.pins);
    const [isOpenScheduleModal, setScheduleModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [limit, setLimit] = useState();
    const socket = useContext(SocketContext);
    const {pinsHistoryData,history} = useSelector(state => state.history);
    globlePinArray = pinsArray;

    const getDeviceHistory = (id) => {
      APIs.getHistory({
        device_id: id
    })
      .then(res => {
        dispatch(updateHistory(res.data));
      })
      .catch(error => console.log('get history error', error));
    }
    useEffect(()=>{
      getDeviceHistory(details._id);
    },[activePinId]);


    const getTotleAmoutOfPin = (pinHistory) => {
      let totle = 0;
      let totleUnit = 0;
      
      if(!pinHistory[pinHistory.length -1].switch_off_time){
        const current = moment();
       const diffrent = current.diff(moment(pinHistory[pinHistory.length -1].switch_on_time)._d,"seconds");
       const diffHours = diffrent / 3600;
       totle = diffHours;
       totleUnit = (pinHistory[0].defaultWattOfPin * diffHours )/ 1000
      }
      for(let i=0;i<pinHistory.length; i++){
        if(pinHistory[i].switch_off_time && pinHistory[i].switch_on_time){
          let duration = Number(pinHistory[i].duration.replace('hr', ''));
          totle = totle + duration;
          totleUnit = pinHistory[i].consumptionWattPerHour / 1000
        }
      }
      return {
        totleDuration:totle,
        totleUnit,
        totleCost :totleUnit * UNIT_PRICE,
        history:pinHistory,
        pinId:pinHistory[0].pin_Id,
        watt:pinHistory[0].defaultWattOfPin
      }
    }

  const handleUpdateHistory = (history) => {
      console.log(groupByKey(history,"pin_Id"));
      const pinsArray = Object.values(groupByKey(history,"pin_Id"));
      let pinHistoryData = {};
      for(let i=0; i<pinsArray.length; i++){
        let pinHistory = pinsArray[i];
        pinHistoryData[pinHistory[0].pin_Id] = getTotleAmoutOfPin(pinHistory);
      }
      dispatch(updatePinsHistoryData(pinHistoryData));
  }

  useEffect(()=>{
    handleUpdateHistory(history)
  },[history])

    const activePin = useMemo(() => {
      return pinsArray.find(item => item.pinId === activePinId);
    }, [pinsArray, activePinId]);
    const activePinHistory = useMemo(()=>{
      if(pinsHistoryData){
        return pinsHistoryData[activePinId];
      }
    },[activePinId,pinsHistoryData]);

    const updatePinValue = (item) => {
      let tempItem = [...globlePinArray];
      const index = tempItem.findIndex(e => e.pinId === item.pinId);
      tempItem[index] = {
        ...tempItem[index],
        status: item.value
      };
     
      setPinArray([...tempItem]);
    }
  
    useEffect(() => {
      const joinData = {
        devicesId: Number(details?.serial_number),
        from: 'App',
      };
  
      socket.emit('join_me', joinData);
      socket.on('pin_state', data => {
        updatePinValue(data);
      });
      socket.on('buttonState', data => {
        updatePinValue(data);
      });
    }, [socket]);
  
    const toggleState = () => {
      let tempItem = [...pinsArray];
      const activePin = pinsArray.find(item => item.pinId === activePinId);
      const index = tempItem.findIndex(e => e.pinId === activePin.pinId);
      tempItem[index] = {
        ...tempItem[index],
        status: tempItem[index].status ? false : true,
      };
      const sendData = {
        pinId: tempItem[index].pinId,
        value: tempItem[index].status,
        devicesId: Number(details?.serial_number),
      };
      setPinArray([...tempItem]);
      socket.emit("buttonState",sendData);
    };
    const handleLimit = () => {
      if (isEdit) {
        //pass limit to node
        let tempItem = [...pinsArray];
        const activePin = pinsArray.find(item => item.pinId === activePinId);
        const index = tempItem.findIndex(e => e.pinId === activePin.pinId);
        tempItem[index] = {
          ...tempItem[index],
          limit: limit,
        };
        
        let param = {
          "serial_number":details?.serial_number,
          "pinId":activePin.pinId,
          "limit":limit
        }
        APIs.updatePinLimit(param).then((res)=>{
          setPinArray([...tempItem]);
        }).catch(error=>{console.log('Error while updating limit', error)})
      }
      setIsEdit(!isEdit);
    };
  
    return (
      <SafeAreaView>
        <Text style={styles.header}>{details?.name}</Text>
        <ScrollView >
        <DeviceListing
          activePinId={activePinId}
          data={pinsArray}
          handleClick={item => {
            setActivePinId(item.pinId);
          }}
        />
  
        <View style={styles.statusBox}>
          <Text style={styles.text}>{activePin.pinName}</Text>
          <Switch
            trackColor={{false: Color.DARK_GRAY, true: Color.SUCCESS}}
            thumbColor={!activePin.status ? '#ffff' : '#f4f3f4'}
            onValueChange={() => toggleState()}
            value={!activePin.status}
          />
        </View>
        {/* {!activePin.limit ? ( */}
          <View style={styles.limitView}>
            <Text style={styles.text}>Consumption limit: </Text>
            {isEdit ? (
              <TextInput
                onChangeText={(text) => setLimit(text)}
                style={[styles.text, styles.input]}
                defaultValu={activePin?.limit}
                value={limit}
                placeholder={'Enter unit'}
                placeholderTextColor={Color.NORMAL_TEXT_COLOR}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.text, styles.input]}>{activePin.limit}</Text>
            )}
            <Text style={styles.text}> kWh </Text>
            <TouchableOpacity onPress={handleLimit}>
              <Text style={[styles.text, {color: Color.BLUE,marginLeft:10}]}>
                {/* {isEdit && activePin.limit ? 'Update' : !activePin.limit ? 'Set' :'Edit'} */}
                {isEdit?'Update':'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
              <View>
              <Text style={styles.info}>Consumed unit {activePin?.pinName} : {activePinHistory?.totleUnit? (activePinHistory?.totleUnit)?.toFixed(2):0.0} kWh</Text>
              <Text style={styles.info}>Total Cost: {activePinHistory?.totleCost?(activePinHistory?.totleCost).toFixed(2):0} ₹</Text>
              </View>
        <TouchableOpacity
          onPress={() => setScheduleModal(true)}
          style={styles.button}>
          <Text style={[styles.text, {color: Color.WHITE}]}>
            {activePin.isScheduled ? 'Update' : 'Schedule'} Automation Time
          </Text>
        </TouchableOpacity>
        <DeviceStatusHistory history={activePinHistory?.history} />
        <BottomModal
          isOpen={isOpenScheduleModal}
          header={`Schedule ${activePin.pinName}`}
          handleOnClose={() => setScheduleModal(false)}>
          <Scheduler
            cbSuccess={() => setScheduleModal(false)}
            deviceInfo={{
              serial_number: details?.devices?.serial_number,
              name: activePin.name,
              pinId: activePin.pinId,
            }}
          />
        </BottomModal>
        </ScrollView>
      </SafeAreaView>
    );
  };
  const styles = StyleSheet.create({
    header: {
      padding: 15,
      backgroundColor: Color.WHITE,
      fontSize: 20,
      fontWeight: 'bold',
      color:Color.NORMAL_TEXT_COLOR
    },
    toggleButton: {
      alignSelf: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginVertical: 20,
    },
    limitView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 30,
      justifyContentL: 'space-between',
    },
    text: {
      fontSize: 18,
      color: Color.BLACK,
    },
    input: {
      borderBottomWidth: 1,
      width: 100,
    },
    statusBox: {
      margin: 30,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      backgroundColor: Color.WHITE,
    },
    button: {
      backgroundColor: Color.DARK_BLUE,
      marginLeft: 30,
      marginVertical:20,
      alignSelf: 'flex-start',
      padding: 15,
      borderRadius: 8,
    },
    info:{
      fontWeight:'bold',
      marginLeft:30,
      marginTop:10,
      color:Color.NORMAL_TEXT_COLOR
    }
  });
  