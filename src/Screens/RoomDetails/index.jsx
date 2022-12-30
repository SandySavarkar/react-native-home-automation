import {
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    TextInput,
  } from 'react-native';
  import React, {useMemo, useState, useEffect, useContext, useRef} from 'react';
  import DeviceListing from '../../components/DeviceListing';
  import Color from '../../utils/Color';
  import DeviceStatusHistory from '../../components/DeviceStatusHistory';
  import {SocketContext} from '../../contexts/Socket';
  import BottomModal from '../../components/BottomModal';
  import Scheduler from './Components/Scheduler';
  
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
  
  export const RoomDetails = ({route}) => {
    const {details} = route?.params;
    console.log('details: ', details);
    // const [activePin, setActivePin] = useState({});
    const [activePinId, setActivePinId] = useState(5);
    const [pinsArray, setPinArray] = useState(details?.pins);
    const [isOpenScheduleModal, setScheduleModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [limit, setLimit] = useState();
    const socket = useContext(SocketContext);
  
    const activePin = useMemo(() => {
      return pinsArray.find(item => item.pinId === activePinId);
    }, [pinsArray, activePinId]);
  
    console.log('activePin: ', activePin);
  
    useEffect(() => {
      const joinData = {
        devicesId: 1846482,
        from: 'App',
      };
  
      socket.emit('join_me', joinData);
      // socket.on('pin_state', data => {
      //   updatePinValue(data);
      // });
    }, [socket]);
  
    const toggleState = () => {
      let tempItem = [...pinsArray];
      const activePin = pinsArray.find(item => item.pinId === activePinId);
      const index = tempItem.findIndex(e => e.pinId === activePin.pinId);
      tempItem[index] = {
        ...tempItem[index],
        value: tempItem[index].value ? false : true,
      };
      const sendData = {
        pinId: tempItem[index].pinId,
        value: !tempItem[index].value,
        devicesId: 1846482,
      };
      setPinArray([...tempItem]);
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
  
        setPinArray([...tempItem]);
      }
      setIsEdit(!isEdit);
    };
    const handleHistory =()=>{
  
    }
    return (
      <View>
        <Text style={styles.header}>{details?.name}</Text>
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
            thumbColor={activePin.value ? '#ffff' : '#f4f3f4'}
            onValueChange={() => toggleState()}
            value={activePin.value}
          />
        </View>
        {/* {!activePin.limit ? ( */}
          <View style={styles.limitView}>
            <Text style={styles.text}>Consumption limit: </Text>
            {isEdit ? (
              <TextInput
                onChangeText={(text) => setLimit(text)}
                style={[styles.text, styles.input]}
                value={limit}
                placeholder={'Enter unit'}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.text, styles.input]}>{activePin.limit}</Text>
            )}
            <Text style={styles.text}> kWh </Text>
            <TouchableOpacity onPress={handleLimit}>
              <Text style={[styles.text, {color: Color.BLUE,marginLeft:20}]}>
                {isEdit && activePin.limit ? 'Update' : !activePin.limit ? 'Set' :'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        {/* // ) : (
        //   <TouchableOpacity */}
        {/* //     onPress={() => console.log('heekke')}
        //     style={styles.button}>
        //     <Text style={[styles.text, {color: Color.WHITE}]}>
        //       Set Consumption Limit
        //     </Text>
        //   </TouchableOpacity> */}
        {/* // )} */}
        <TouchableOpacity
          onPress={() => setScheduleModal(true)}
          style={styles.button}>
          <Text style={[styles.text, {color: Color.WHITE}]}>
            {activePin.isScheduled ? 'Update' : 'Schedule'} Automation Time
          </Text>
        </TouchableOpacity>
      <TouchableOpacity
            onPress={handleHistory}
             style={styles.button}>
             <Text style={[styles.text, {color: Color.WHITE}]}>
               Set Consumption Limit
             </Text>
             </TouchableOpacity>
        <DeviceStatusHistory history={activePin?.history} />
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
      </View>
    );
  };
  const styles = StyleSheet.create({
    header: {
      padding: 15,
      backgroundColor: Color.WHITE,
      fontSize: 20,
      fontWeight: 'bold',
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
      margin: 30,
      alignSelf: 'flex-start',
      padding: 15,
      borderRadius: 8,
    },
  });
  